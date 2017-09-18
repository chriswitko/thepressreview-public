'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository')
const config = require('./config/')
const mediator = new EventEmitter()

console.log('Connecting to repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

const startServerWithDatabase = _ => {
  mediator.on('db.ready', (db) => {
    initRepository(db)
  })

  mediator.on('db.error', (err) => {
    console.error(err)
  })

  config.db.connect(config.dbSettings, mediator)
}

const initRepository = db => {
  let rep
  repository.connect(db)
    .then(repo => {
      console.log('Connected. Starting Server')
      rep = repo
      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        repo,
        dbSettings: config.dbSettings
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
}

startServerWithDatabase()

mediator.emit('boot.ready')
