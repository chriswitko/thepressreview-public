'use strict'
const { sign, verify } = require('./tokens')
const { sendNotification } = require('./notifications')
const stripe = require('stripe')('sk_test_oqG0gqHiNAIPgDGZ3GoOBmc5')
const { deleteSubscription } = require('./billing')

module.exports = (server, options, app) => {
  const { repo } = options

  server.get('/api/testStripe', (req, res, next) => {
    // Create a new customer and then a new charge for that customer:
    stripe.customers.create({
      email: 'foo-customer@example.com'
    }).then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: {
          object: 'card',
          exp_month: 10,
          exp_year: 2018,
          number: '4242 4242 4242 4242',
          cvc: 100,
          address_zip: 'W3 7TX'
        }
      })
    }).then((source) => {
      return stripe.charges.create({
        amount: 1600,
        currency: 'usd',
        customer: source.customer
      })
    }).then((charge) => {
      // New charge created on a new customer
      return res.status(200).json({status: 'success', charge: charge})
    }).catch((err) => {
      // Deal with an error
      return res.status(200).json({status: 'success', message: err})
    })
  })

  server.get('/api/verifyToken', (req, res, next) => {
    if (!req.query.token || !req.query.action) {
      return res.status(200).json({status: 'error'})
    }
    verify(req.query.token, req.query.action, (err, decoded) => {
      if (err) {
        return res.status(200).json({status: 'error'})
      } else {
        return res.status(200).json(decoded)
      }
    })
  })

  server.get('/api/generateToken', (req, res, next) => {
    if (!req.query.token || !req.query.action) {
      return res.status(200).json({status: 'error'})
    }
    const { action } = req.query

    verify(req.query.token, 'login', (err, decoded) => {
      if (err) {
        return res.status(200).json({status: 'error'})
      }

      const token = sign(action, {
        user_id: decoded.user_id.toString()
      })

      return res.status(200).json({
        action,
        token
      })
    })
  })

  server.get('/', (req, res, next) => {
    if (req.cookies.user_id) {
      repo.readers.getById(req.cookies.user_id).then(user => {
        if (user._id) {
          if (user.ready_at) {
            return res.redirect('/settings')
          } else {
            return res.redirect('/welcome')
          }
        }
      }).catch(_ => {
        // return res.readers('/')
      })
    } else {
      return app.render(req, res, '/', req.query)
    }
  })

  server.get('/auth', (req, res, next) => {
    if (!req.query.token) {
      return res.redirect('/')
    }
    verify(req.query.token, 'auth', (err, decoded) => {
      if (err) {
        return res.redirect('/')
      } else {
        res.cookie('user_id', decoded.user_id.toString(), { maxAge: 14 * 24 * 3600000 }) // 30 min
        res.cookie('user_token', req.query.token, { maxAge: 14 * 24 * 3600000 }) // 30 min

        repo.readers.getById(decoded.user_id).then(user => {
          if (user._id) {
            if (user.ready_at) {
              return res.redirect('/settings')
            } else {
              return res.redirect('/welcome')
            }
          }
        }).catch(_ => {
          return res.redirect('/')
        })
      }
    })
  })

  server.get('/subscribe', (req, res, next) => {
    if (!req.query.token) {
      return res.redirect('/')
    }
    verify(req.query.token, 'subscribe', (err, decoded) => {
      if (err) {
        return res.redirect('/')
      } else {
        repo.readers.getById(decoded.user_id).then(user => {
          repo.readers.updateSettings({
            subscribed_at: new Date().toISOString()
          }, decoded.user_id).then(item => {
            res.cookie('user_id', decoded.user_id.toString(), { maxAge: 14 * 24 * 3600000 })
            res.cookie('user_token', sign('auth', {
              user_id: decoded.user_id.toString()
            }), { maxAge: 14 * 24 * 3600000 })

            if (user.ready_at) {
              return res.redirect('/subscribed')
            } else {
              return res.redirect('/welcome')
            }
          }).catch(_ => {
            return res.redirect('/')
          })
        }).catch(_ => {
          return res.redirect('/')
        })
      }
    })
  })

  server.get('/unsubscribe', (req, res, next) => {
    const token = req.query.token || req.cookies.user_token

    if (!token) {
      return res.redirect('/')
    }
    verify(token, 'any', (err, decoded) => {
      if (err) {
        console.log('unsubscribe err', err)
        // return res.redirect('/')
      } else {
        console.log('unsubscribed processed')
        repo.readers.getById(decoded.user_id).then(user => {
          if (user.stripe_sub_id) {
            deleteSubscription({
              sub_id: user.stripe_sub_id
            }).then(_ => {
              repo.readers.updateSettings({
                unsubscribed_at: new Date().toISOString(),
                stripe_sub_id: '',
                plan: 'free',
                redeem_code: '',
                hours: user.hours.splice(0, 4)
              }, decoded.user_id).then(item => {
                res.clearCookie('user_id')
                return res.redirect('/unsubscribed')
              }).catch(_ => {
                return res.redirect('/')
              })
            })
          } else {
            repo.readers.updateSettings({
              unsubscribed_at: new Date().toISOString(),
              stripe_sub_id: '',
              plan: 'free',
              hours: user.hours.splice(0, 4)
            }, decoded.user_id).then(item => {
              res.clearCookie('user_id')
              return res.redirect('/unsubscribed')
            }).catch(_ => {
              return res.redirect('/')
            })
          }
        })
      }
    })
  })

  server.get('/resend', (req, res, next) => {
    const token = req.query.token || req.cookies.user_token

    if (!token) {
      return res.redirect('/')
    }

    verify(token, 'auth', (err, decoded) => {
      if (err) {
        return res.redirect('/')
      } else {
        repo.readers.getById(decoded.user_id).then(item => {
          sendNotification({
            templateName: 'activate',
            subject: 'Activation link',
            emailTo: item.email,
            token: sign('subscribe', {
              user_id: item._id.toString()
            })
          })
          return res.redirect('/settings/confirm?resent=true')
        }).catch(_ => {
          return res.redirect('/')
        })
      }
    })
  })

  server.get('/api/test', (req, res, next) => {
    next(new Error('Something went wrong :-('))
  })

  server.get('/api/topics', (req, res, next) => {
    const topics = [
      {
        name: 'Daily News',
        code: 'latest',
        isSubscribed: false,
        i18n: 'topics_latest',
        defaultIndex: 0
      },
      {
        name: 'Business',
        // background: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?dpr=2&auto=compress,format&fit=max&w=376&q=80&cs=tinysrgb&crop=',
        code: 'business',
        isSubscribed: false,
        i18n: 'topics_business',
        defaultIndex: 1
      },
      {
        name: 'Politics',
        code: 'politics',
        isSubscribed: true,
        i18n: 'topics_politics',
        defaultIndex: 2
      },
      {
        name: 'Entertainment',
        code: 'entertainment',
        isSubscribed: false,
        i18n: 'topics_entertainment',
        defaultIndex: 3
      },
      {
        name: 'Tech',
        // background: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=',
        code: 'tech',
        isSubscribed: false,
        i18n: 'topics_tech',
        defaultIndex: 4
      },
      {
        name: 'Sport',
        // background: 'https://images.unsplash.com/photo-1418662589339-364ad47f98a2?dpr=2&auto=compress,format&fit=crop&w=376&h=253&q=80&cs=tinysrgb&crop=',
        code: 'sport',
        isSubscribed: false,
        i18n: 'topics_sport',
        defaultIndex: 5
      },
      {
        name: 'Gossips',
        code: 'gossips',
        isSubscribed: false,
        i18n: 'topics_gossips',
        defaultIndex: 6
      },
      {
        name: 'Art & Culture',
        code: 'art_culture',
        isSubscribed: false,
        i18n: 'topics_art_culture',
        defaultIndex: 7
      },
      {
        name: 'Film',
        code: 'film',
        isSubscribed: false,
        i18n: 'topics_film',
        defaultIndex: 8
      },
      {
        name: 'Food',
        code: 'food',
        isSubscribed: false,
        i18n: 'topics_food',
        defaultIndex: 9
      },
      {
        name: 'Music',
        code: 'music',
        isSubscribed: false,
        i18n: 'topics_music',
        defaultIndex: 10
      },
      {
        name: 'Science',
        code: 'science',
        isSubscribed: false,
        i18n: 'topics_science',
        defaultIndex: 11
      },
      {
        name: 'Photography',
        code: 'photography',
        isSubscribed: false,
        i18n: 'topics_photography',
        defaultIndex: 12
      },
      {
        name: 'Travel',
        code: 'travel',
        isSubscribed: false,
        i18n: 'topics_tracel',
        defaultIndex: 13
      },
      {
        name: 'Style',
        code: 'style',
        isSubscribed: false,
        i18n: 'topics_style',
        defaultIndex: 14
      },
      {
        name: 'Health',
        code: 'health',
        isSubscribed: false,
        i18n: 'topics_health',
        defaultIndex: 15
      },
      {
        name: 'Media',
        code: 'media',
        isSubscribed: false,
        i18n: 'topics_media',
        defaultIndex: 16
      }
    ]

    res.status(200).json(topics)
  })

  server.get('/lang/:lang', (req, res, next) => {
    if (req.params.lang) {
      req.i18n.changeLanguage(req.params.lang)
    }
    res.redirect('/')
  })

  server.post('/api/auth', (req, res, next) => {
    let sess = req.session

    if (!sess.user) {
      sess.user = {
        email: req.body.email
      }
    }

    res.status(200).json({
      email: req.body.email,
      token: '123'
    })
  })

  server.post('/api/logout', (req, res, next) => {
    req.session.destroy(() => res.status(200).json({status: 'success'}))
  })
}

