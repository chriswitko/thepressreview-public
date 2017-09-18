'use strict'

const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')

const { serverSettings } = require('../config')
const { sign } = require('./tokens')
const { sendNotification } = require('./notifications')
const { getNextDeliveryTime } = require('./dates')
const { createCustomerWithCard, getTax, createSubscription, deleteSubscription, deleteCard, validateRedeemCode } = require('./billing')

module.exports = (server, options) => {
  const { repo } = options

  server.get('/api/readers/:id', (req, res, next) => {
    console.log('session token', req.query.token)
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          res.status(200).json(item)
        }).catch(() => {
          res.status(200).json({
            _id: null
          })
        })
      })
    } else {
      res.status(400).json({
        status: 'error'
      })
    }
  })

  server.get('/api/readers/:id/channels', async (req, res, next) => {
    repo.readers.getById(req.params.id).then(item => {
      let summary = []
      const { channels = [], topics = [] } = item

      channels.map(c => {
        topics.map(t => {
          summary.push(`${c}_${t}`)
        })
      })
      res.status(200).json({
        channels: summary
      })
    }).catch(_ => {
      res.status(200).json({
        channels: []
      })
    })
  })

  server.put('/api/testTax', async (req, res, next) => {
    const json = await getTax({
      country: req.body.country,
      vatNumber: req.body.vat_number
    })
    json.price = parseFloat(req.body.price)
    json.vat_total = json.price * ((json.vat_rate / 100))
    json.total = json.price + json.vat_total
    res.status(200).json(json)
  })

  server.put('/api/readers/billing/removeCard', (req, res, next) => {
    let tasks = []
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          if (item.stripe_sub_id) {
            tasks.push(deleteSubscription({sub_id: item.stripe_sub_id}))
          }
          if (item.stripe_cc_id) {
            tasks.push(deleteCard({customer: item.stripe_customer_id, card_id: item.stripe_cc_id}))
          }
          Promise.all(tasks).then(_ => {
            repo.readers.updateSettings({
              stripe_sub_id: '',
              stripe_cc_id: '',
              hours: item.hours.slice(0, 4)
            }, decoded.user_id).then(item => {
              res.status(200).json({
                status: 'success'
              })
            }).catch(err => {
              res.status(200).json({
                status: 'error',
                message: err
              })
            })
          }).catch(err => {
            res.status(200).json({
              status: 'error',
              message: err
            })
          })
        })
      })
    } else {
      res.status(200).json({
        status: 'error'
      })
    }
  })

  server.put('/api/readers/billing/upgrade', (req, res, next) => {
    const plans = {
      'premium': 'THEPRESSREVIEW_PREMIUM'
    }

    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          if (req.body.redeem_code) {
            validateRedeemCode({
              code: req.body.redeem_code
            }).then(code => {
              repo.readers.updateSettings({
                plan: req.body.plan,
                redeem_code: req.body.redeem_code
              }, decoded.user_id).then(item => {
                res.status(200).json({
                  status: 'success'
                })
              }).catch(err => {
                res.status(400).json({
                  status: 'error',
                  message: err
                })
              })
            }).catch(err => {
              res.status(400).json({
                status: 'error',
                message: err
              })
            })
          } else {
            if (req.body.plan === 'free') {
              if (item.stripe_sub_id) {
                deleteSubscription({sub_id: item.stripe_sub_id}).then(_ => {
                  repo.readers.updateSettings({
                    stripe_sub_id: '',
                    redeem_code: '',
                    plan: req.body.plan,
                    hours: item.hours.slice(0, 4)
                  }, decoded.user_id).then(item => {
                    res.status(200).json({
                      status: 'success'
                    })
                  }).catch(err => {
                    res.status(400).json({
                      status: 'error',
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(400).json({
                    status: 'error',
                    message: err
                  })
                })
              } else {
                repo.readers.updateSettings({
                  stripe_sub_id: '',
                  plan: req.body.plan,
                  hours: item.hours.slice(0, 4)
                }, decoded.user_id).then(item => {
                  res.status(200).json({
                    status: 'success'
                  })
                }).catch(err => {
                  res.status(400).json({
                    status: 'error',
                    message: err
                  })
                })
              }
            } else {
              if (item.stripe_cc_id) {
                createSubscription({customer: item.stripe_customer_id, plan: plans[req.body.plan], country: req.body.country, vatNumber: item.vat_id}).then(subs => {
                  repo.readers.updateSettings({
                    stripe_sub_id: subs.id,
                    plan: req.body.plan,
                    country: req.body.country,
                    tax_percent: subs.tax_percent
                  }, decoded.user_id).then(item => {
                    res.status(200).json({
                      status: 'success'
                    })
                  }).catch(err => {
                    res.status(400).json({
                      status: 'error',
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(400).json({
                    status: 'error',
                    message: err
                  })
                })
              } else {
                let card = {
                  email: item.email,
                  number: req.body.cc_number,
                  cvc: req.body.cc_cvv,
                  expMonth: req.body.cc_exp_month,
                  expYear: req.body.cc_exp_year,
                  zip: req.body.cc_zip
                }
                createCustomerWithCard(card, (err, transaction) => {
                  if (err) {
                    return res.status(400).json({
                      status: 'error',
                      message: err
                    })
                  }
                  createSubscription({customer: transaction.customer, plan: plans[req.body.plan], country: req.body.country, vatNumber: item.vat_id}).then(subs => {
                    repo.readers.updateSettings({
                      stripe_customer_id: transaction.customer,
                      stripe_cc_id: transaction.id,
                      stripe_cc_exp_month: transaction.exp_month,
                      stripe_cc_exp_year: transaction.exp_year,
                      stripe_cc_brand: transaction.brand,
                      stripe_cc_last4: transaction.last4,
                      stripe_sub_id: subs.id,
                      plan: req.body.plan,
                      country: req.body.country,
                      tax_percent: subs.tax_percent
                    }, decoded.user_id).then(item => {
                      res.status(400).json({
                        status: 'success'
                      })
                    }).catch(err => {
                      res.status(400).json({
                        status: 'error',
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(400).json({
                      status: 'error',
                      message: err
                    })
                  })
                })
              }
            }
          }
        })
      })
    }
  })

  server.put('/api/readers/billing/card', (req, res, next) => {
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          let card = {
            email: item.email,
            number: req.body.cc_number,
            cvc: req.body.cc_cvv,
            expMonth: req.body.cc_exp_month,
            expYear: req.body.cc_exp_year,
            zip: req.body.cc_zip
          }

          if (item.stripe_cc_id) {
            card.ccId = item.stripe_cc_id
          }
          if (item.stripe_customer_id) {
            card.customerId = item.stripe_customer_id
          }

          createCustomerWithCard(card, (err, transaction) => {
            if (err) {
              return res.status(400).json({
                status: 'error',
                message: err
              })
            }
            repo.readers.updateSettings({
              stripe_customer_id: transaction.customer,
              stripe_cc_id: transaction.id,
              stripe_cc_exp_month: transaction.exp_month,
              stripe_cc_exp_year: transaction.exp_year,
              stripe_cc_brand: transaction.brand,
              stripe_cc_last4: transaction.last4
            }, decoded.user_id).then(item => {
              res.status(200).json({
                status: 'success'
              })
            }).catch(err => {
              res.status(400).json({
                status: 'error',
                message: err
              })
            })
          })
        }).catch(_ => {
          res.status(400).json({
            status: 'error'
          })
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })

  server.get('/api/readers/session', (req, res, next) => {
    if (req.cookies.user_id) {
      repo.readers.getById(req.cookies.user_id).then(item => {
        res.status(200).json(item)
      }).catch(err => {
        res.status(400).json({
          status: 'error',
          message: err
        })
      })
    } else {
      res.status(401).json({
        status: 'error'
      })
    }
  })

  server.put('/api/readers/resendLoginLink', (req, res, next) => {
    if (req.body.email) {
      repo.readers.getByEmail(req.body.email)
        .then(item => {
          item = Object.assign({}, item, {
            token: sign('auth', {
              user_id: item._id.toString()
            })
          })
          sendNotification({
            templateName: 'login',
            subject: 'Your login link',
            emailTo: req.body.email,
            token: item.token,
            data: {
              subscriber: item
            }
          }).then(_ => {
            res.status(200).json({
              status: 'success'
            })
          }).catch(err => {
            res.status(400).json({
              status: 'error',
              message: err
            })
          })
        }).catch(err => {
          res.status(400).json({
            status: 'error',
            message: err
          })
        })
    } else {
      res.status(401).json({
        status: 'error'
      })
    }
  })

  server.put('/api/readers/resendActivationLink', (req, res, next) => {
    res.status(200).json({
      status: 'success'
    })
  })

  server.put('/api/readers/removeSchedule', (req, res, next) => {
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          const sorted = item.hours.filter(h => h !== req.body.hour)
          const nextAt = getNextDeliveryTime({
            day: moment().add(2, 'minutes').toISOString(), // .add(2, 'days')..add(3, 'days')
            timezone: item.timezone || 'Europe/London', // America/Los_Angeles, Europe/London
            days: item.days,
            hours: sorted
          })
          repo.readers.updateSettings({
            hours: sorted,
            next_at: nextAt
          }, decoded.user_id).then(item => {
            res.status(200).json({
              status: 'success'
            })
          }).catch(next)
        }).catch(_ => {
          res.status(400).json({
            status: 'error'
          })
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })

  server.put('/api/readers/addSchedule', (req, res, next) => {
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          if ((item.hours.length < 4 || item.plan === 'free') || item.plan !== 'free') {
            let hours = new Set(item.hours)
            hours.add(req.body.hour)
            const sorted = Array.from(hours).sort(function (a, b) {
              return Date.parse('01/01/2013 ' + a) - Date.parse('01/01/2013 ' + b)
            })
            const nextAt = getNextDeliveryTime({
              day: moment().add(2, 'minutes').toISOString(), // .add(2, 'days')..add(3, 'days')
              timezone: item.timezone || 'Europe/London', // America/Los_Angeles, Europe/London
              days: item.days,
              hours: sorted
            })
            repo.readers.updateSettings({
              hours: sorted,
              next_at: nextAt
            }, decoded.user_id).then(item => {
              res.status(200).json({
                status: 'success'
              })
            }).catch(next)
          } else {
            res.status(400).json({
              status: 'success'
            })
          }
        }).catch(_ => {
          res.status(400).json({
            status: 'error'
          })
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })

  server.put('/api/readers/markAsReady', (req, res, next) => {
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          if (!item.ready_at) {
            repo.readers.updateSettings({
              ready_at: new Date().toISOString()
            }, decoded.user_id).then(item => {
              res.status(200).json({
                status: 'success'
              })
            }).catch(next)
          } else {
            res.status(200).json({
              status: 'success'
            })
          }
        }).catch(_ => {
          res.status(400).json({
            status: 'error'
          })
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })

  server.put('/api/readers', (req, res, next) => {
    if (req.query.token) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          req.body.next_at = getNextDeliveryTime({
            day: moment().add(2, 'minutes').toISOString(), // .add(2, 'days')..add(3, 'days')
            timezone: req.body.timezone || item.timezone || 'Europe/London', // America/Los_Angeles, Europe/London
            days: item.days,
            hours: item.hours
          })
          repo.readers.updateSettings(req.body, decoded.user_id).then(item => {
            res.status(200).json({
              status: 'success'
            })
          }).catch(next)
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })

  server.post('/api/readers', (req, res, next) => {
    if (req.body.email) {
      repo.readers.createOne({
        email: req.body.email,
        language: req.body.language,
        browser_language: req.body.browser_language,
        geo: req.body.geo
      }).then(item => {
        if (item.isNew) {
          res.cookie('user_id', item._id.toString(), { maxAge: 14 * 24 * 900000 })
          const token = sign('auth', {
            user_id: item._id.toString()
          })
          res.cookie('user_token', token, { maxAge: 14 * 24 * 3600000 })
          sendNotification({
            templateName: 'activate',
            subject: 'Activation link',
            emailTo: req.body.email,
            token: sign('subscribe', {
              user_id: item._id.toString()
            }),
            data: {
              subscriber: item
            }
          }).then(_ => {
            res.status(200).json({
              success: true,
              email: req.body.email,
              isNew: item.isNew
            })
          }).catch(err => {
            res.status(400).json({
              status: 'error',
              message: err
            })
          })
        } else {
          item = Object.assign({}, item, {
            token: sign('auth', {
              user_id: item._id.toString()
            })
          })
          sendNotification({
            templateName: 'login',
            subject: 'Your login link',
            emailTo: req.body.email,
            token: item.token,
            data: {
              subscriber: item
            }
          }).then(_ => {
            res.status(200).json({
              success: true,
              email: req.body.email,
              isNew: item.isNew
            })
          }).catch(err => {
            res.status(400).json({
              status: 'error',
              message: err
            })
          })
        }
      }).catch(next)
    } else {
      res.status(401).json({
        status: 'error'
      })
    }
  })

  server.put('/api/readers/sendInvitations', (req, res, next) => {
    if (req.query.token && (req.body.invite_email_one || req.body.invite_email_two || req.body.invite_email_three)) {
      jwt.verify(req.query.token, serverSettings.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error1',
            err: err
          })
        }
        repo.readers.getById(decoded.user_id).then(item => {
          let queue = []
          const alreadySent = item.invites || []
          let emails = new Set(alreadySent)
          if (req.body.invite_email_one && !alreadySent.includes(req.body.invite_email_one)) {
            emails.add(req.body.invite_email_one)
            queue.push(sendNotification({
              templateName: item.plan === 'free' ? 'invite_free' : 'invite',
              subject: item.plan === 'free' ? `Invitation from ${req.body.fullname || item.email} to join The Press Review` : `Invitation from ${req.body.fullname || item.email} to join The Press Review Premium Edition for FREE`,
              replaceSubject: true,
              emailTo: req.body.invite_email_one,
              data: {
                subscriber: item,
                fromFullname: req.body.fullname,
                fromEmail: item.email,
                personalMessage: req.body.invite_message
              }
            }))
          }
          if (req.body.invite_email_two && !alreadySent.includes(req.body.invite_email_two)) {
            emails.add(req.body.invite_email_two)
            queue.push(sendNotification({
              templateName: item.plan === 'free' ? 'invite_free' : 'invite',
              subject: item.plan === 'free' ? `Invitation from ${req.body.fullname || item.email} to join The Press Review` : `Invitation from ${req.body.fullname || item.email} to join The Press Review Premium Edition for FREE`,
              replaceSubject: true,
              emailTo: req.body.invite_email_two,
              data: {
                subscriber: item,
                fromFullname: req.body.fullname,
                fromEmail: item.email,
                personalMessage: req.body.invite_message
              }
            }))
          }
          if (req.body.invite_email_three && !alreadySent.includes(req.body.invite_email_three)) {
            emails.add(req.body.invite_email_three)
            queue.push(sendNotification({
              templateName: item.plan === 'free' ? 'invite_free' : 'invite',
              subject: item.plan === 'free' ? `Invitation from ${req.body.fullname || item.email} to join The Press Review` : `Invitation from ${req.body.fullname || item.email} to join The Press Review Premium Edition for FREE`,
              replaceSubject: true,
              emailTo: req.body.invite_email_three,
              data: {
                subscriber: item,
                fromFullname: req.body.fullname,
                fromEmail: item.email,
                personalMessage: req.body.invite_message
              }
            }))
          }
          repo.readers.updateSettings({
            fullname: req.body.fullname,
            invites: Array.from(emails),
            invite_message: req.body.invite_message
          }, decoded.user_id).then(_ => {
            Promise.all(queue).then(_ => {
              res.status(200).json({
                status: 'success'
              })
            }).catch(err => {
              res.status(400).json({
                status: 'success',
                message: err
              })
            })
          }).catch(next)
        })
      })
    } else {
      res.status(401).json({
        status: 'error2'
      })
    }
  })
}
