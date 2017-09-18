const AWS = require('amazon-ses-wrapper')
const path = require('path')
const env = require('node-env-file')
const dev = process.env.NODE_ENV !== 'production'
env(path.join(__dirname, `../server/config/${dev ? 'development' : 'production'}`))

const sendNotification = ({ templateName, subject, replaceSubject = false, emailTo, token, data = {} }) => {
  return new Promise((resolve, reject) => {
    const aws = new AWS.AWS({
      emailFrom: process.env.EMAIL_FROM,
      apiKey: process.env.SES_API_KEY,
      apiSecret: process.env.SES_API_SECRET
    })

    const getTemplateFile = (name, lang = 'en') => {
      return path.join(__dirname, `../templates/${lang}/${templateName}.html`)
    }

    const templateFile = getTemplateFile(templateName)

    aws.fetchTemplate(templateFile)
      .then(html => {
        aws.send({
          emailTo: emailTo,
          subject: replaceSubject ? subject : 'The Press Review - ' + subject,
          html: aws.applyDataToHtml(html, {
            emailTo: emailTo,
            websiteUrl: process.env.SITE_URL,
            token: token,
            data: data
          })
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = {
  sendNotification
}
