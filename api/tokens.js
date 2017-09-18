const jwt = require('jsonwebtoken')
const { serverSettings } = require('../config')

const verify = (token, action, cb) => {
  jwt.verify(token, serverSettings.secret, (err, decoded) => {
    if (err) {
      cb(new Error(err))
    }
    if (decoded.action === action || action === 'any') {
      cb(null, decoded)
    } else {
      cb(new Error('Action does not match'))
    }
  })
}

const sign = (action, data) => {
  return jwt.sign({
    user_id: data.user_id.toString(),
    action: action
  }, serverSettings.secret, serverSettings.tokens[action])
}

module.exports = {
  sign,
  verify
}
