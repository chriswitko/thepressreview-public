'use strict'
const ObjectID = require('./ObjectID')
const AppError = require('./AppError')

const repository = (db) => {
  const collection = db.collection('channels')

  // collection.createIndex({ 'email': 1 }, { unique: true })

  const getAll = ({page = 1, limit = 10}) => {
    return new Promise((resolve, reject) => {
      const items = []
      const cursor = collection.find({is_active: true}, {code: 1, icon: 1, name: 1, facebook_id: 1, twitter_id: 1, language: 1, url: 1}).skip((page - 1) * 10, limit).sort([['name', 1]])
      const add = (item) => {
        items.push(item)
      }
      const send = (err) => {
        if (err) {
          resolve(AppError('An error occured fetching all items, err:' + err))
        }
        resolve(items.slice())
      }
      if (cursor) {
        cursor.forEach(add, send)
      } else {
        send('Missing item')
      }
    })
  }

  const getById = id => {
    return new Promise((resolve, reject) => {
      const projection = { }
      const send = (err, item) => {
        if (err || !item) {
          reject(AppError(`An error occured fetching a item with id: ${id}, err: ${err}`))
        }
        resolve(item)
      }
      if (!id) {
        send('No id')
      } else {
        collection.findOne({_id: ObjectID(id), unsubscribed_at: null}, projection, send)
      }
    })
  }

  const update = (data = {}, id) => {
    return new Promise((resolve, reject) => {
      const projection = { }
      const send = (err, item) => {
        if (err || !item) {
          reject(AppError(`An error occured fetching a item with id: ${id}, err: ${err}`))
        }
        resolve(item)
      }
      if (!id) {
        send('No id')
      } else {
        collection.updateOne({_id: ObjectID(id)}, {$set: data}, projection, send)
      }
    })
  }

  return Object.create({
    update,
    getAll,
    getById
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('Connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
