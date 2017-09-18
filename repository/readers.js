'use strict'
const ObjectID = require('./ObjectID')
const AppError = require('./AppError')

const repository = (db) => {
  const collection = db.collection('readers')

  // collection.createIndex({ 'email': 1 }, { unique: true })

  const createOne = (item = {}) => {
    const defaultProps = {
      'language': 'en',
      'role': 'user',
      'topics': ['latest'],
      'channels': [],
      'hours': [
        '07:00',
        '12:30',
        '17:00'
      ],
      'days': [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      'timezone': 'Europe/London',
      'filter_by': 'channels',
      'time_format': '24',
      'created_at': new Date().toISOString(),
      'plan': 'free'
    }

    const itemWithDefaultProps = Object.assign({}, defaultProps, item)

    return new Promise((resolve, reject) => {
      getActiveByEmail(item.email)
        .then((found) => {
          collection.update({_id: ObjectID(found._id)}, {
            $set: {
              last_signin_at: new Date().toISOString(),
              last_seen_geo: item.geo
            }
          }, () => {
            // SEND LOGIN EMAIL
            found = Object.assign({}, {
              isNew: false,
              _id: found._id,
              email: found.email
            })
            resolve(found)
          })
        }).catch(() => {
          collection.insertOne(itemWithDefaultProps, (err, created) => {
            console.log('err1', err)
            if (created) {
              created = Object.assign({}, {
                isNew: true,
                _id: created.insertedId
              })
              resolve(created)
            } else {
              resolve({
                error: 'Error'
              })
            }
          })
        })
    })
  }

  const getAll = ({page = 1, limit = 10}) => {
    return new Promise((resolve, reject) => {
      const items = []
      const cursor = collection.find({}, {id: 1, email: 1}).skip((page - 1) * 10, limit)
      const add = (item) => {
        items.push(item)
      }
      const send = (err) => {
        if (err) {
          return resolve(AppError('An error occured fetching all items, err:' + err))
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
          return reject(AppError(`An error occured fetching a item with id: ${id}, err: ${err}`))
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

  const getByEmail = id => {
    return new Promise((resolve, reject) => {
      const projection = { }
      const send = (err, item) => {
        if (err || !item) {
          return reject(AppError(`An error occured fetching a item with id: ${id}, err: ${err}`))
        }
        resolve(item)
      }
      if (!id) {
        send('No id')
      } else {
        collection.findOne({email: id, unsubscribed_at: null}, projection, send)
      }
    })
  }

  const updateSettings = (data = {}, id) => {
    return new Promise((resolve, reject) => {
      const projection = { }
      const send = (err, item) => {
        if (err || !item) {
          return reject(AppError(`An error occured fetching a item with id: ${id}, err: ${err}`))
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

  const getActiveByEmail = email => {
    return new Promise((resolve, reject) => {
      const projection = { }
      const send = (err, item) => {
        console.log('err', err)
        if (err || !item) {
          return reject(AppError(`An error occured fetching a item with email: ${email}, err: ${err}`))
        }
        resolve(item)
      }
      if (!email) {
        send('No id')
      } else {
        collection.findOne({email: email, unsubscribed_at: null}, projection, send)
      }
    })
  }

  return Object.create({
    updateSettings,
    getActiveByEmail,
    createOne,
    getAll,
    getById,
    getByEmail
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
