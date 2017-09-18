const MongoClient = require('mongodb')

const getMongoURL = (options) => {
  return options.db
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options), {}, (err, db) => {
        if (err) {
          mediator.emit('db.error', err)
        }

        mediator.emit('db.ready', db)
      })
  })
}

module.exports = Object.assign({}, {connect})
