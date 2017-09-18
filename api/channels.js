'use strict'

const ResponseInterceptor = require('./ResponseInterceptor')

module.exports = (server, options) => {
  const { repo } = options

  server.get('/api/channels', (req, res, next) => {
    const { page, limit } = req.query
    repo.channels.getAll({page, limit}).then(items => {
      ResponseInterceptor(items, res)
    }).catch(next)
  })

  server.get('/api/channels/:id', (req, res, next) => {
    repo.channels.getById(req.params.id).then(item => {
      ResponseInterceptor(item, res)
    }).catch(() => {
      res.status(200).json({
        _id: null
      })
    })
  })
}
