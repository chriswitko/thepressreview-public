'use strict'

const {dbSettings, serverSettings} = require(`./${process.env.NODE_ENV || 'development'}.js`)
const db = require('./mongo')

module.exports = Object.assign({}, {dbSettings, serverSettings, db})
