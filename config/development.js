// TODO: Add env versions dev, beta, prod
const dbSettings = {
  db: process.env.DB || ''
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl'),
  secret: '',
  tokens: {
    auth: {expiresIn: '14d'},
    unsubscribe: {},
    login: {expiresIn: '30m'}
  }
}

module.exports = Object.assign({}, { dbSettings, serverSettings })
