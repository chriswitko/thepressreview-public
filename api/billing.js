const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const fetch = require('node-fetch-json')
const env = require('node-env-file')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
env(path.join(__dirname, `../server/config/${dev ? 'development' : 'production'}`))

const getTax = ({type = 'B2C', country = 'GB', vatNumber = ''}) => {
  return fetch('http://vatmoss.octobat.com/vat.json', {
    method: 'POST',
    body: {
      'supplier': {
        'country': 'GB',
        'vat_number': 'GB223959880'
      },
      'customer': {
        'country': country,
        'vat_number': vatNumber
      },
      'transaction': {
        'type': vatNumber ? 'B2B' : type,
        'eservice': true
      }
    }
  })
}

const validateRedeemCode = ({code}) => {
  return stripe.coupons.retrieve(code)
}

const deleteCard = ({customer, card_id}, cb) => {
  // Create a new customer and then a new charge for that customer:
  return stripe.customers.deleteCard(customer, card_id)
}

const deleteSubscription = ({sub_id}, cb) => {
  // Create a new customer and then a new charge for that customer:
  return stripe.subscriptions.del(sub_id)
}

const createSubscription = async ({customer, plan, vatNumber, country}) => {
  // Create a new customer and then a new charge for that customer:
  const sum = await getTax({
    price: 5.95,
    vatNumber: vatNumber,
    country: country
  })

  return stripe.subscriptions.create({
    customer: customer,
    items: [
      {
        plan: plan
      }
    ],
    tax_percent: sum.vat_rate
  })
}

const createCustomerWithCard = ({email, ccId, customerId, expMonth, expYear, number, cvc, zip}, cb) => {
  // Create a new customer and then a new charge for that customer:
  if (customerId) {
    stripe.customers.createSource(customerId, {
      source: {
        object: 'card',
        exp_month: expMonth,
        exp_year: expYear,
        number: number,
        cvc: cvc,
        address_zip: zip
      }
    }).then(source => {
      if (ccId) {
        stripe.customers.deleteCard(customerId, ccId).then(_ => {
          return cb(null, source)
        }).catch(_ => {
          return cb(null, source)
        })
      } else {
        return cb(null, source)
      }
    }).catch(err => {
      return cb(err)
    })
  } else {
    stripe.customers.create({
      email: email
    }).then((customer) => {
      stripe.customers.createSource(customer.id, {
        source: {
          object: 'card',
          exp_month: expMonth,
          exp_year: expYear,
          number: number,
          cvc: cvc,
          address_zip: zip
        }
      }).then(source => {
        if (ccId) {
          stripe.customers.deleteCard(customerId, ccId).then(_ => {
            return cb(null, source)
          }).catch(_ => {
            return cb(null, source)
          })
        } else {
          return cb(null, source)
        }
      }).catch(err => {
        return cb(err)
      })
    }).catch((err) => {
      // Deal with an error
      return cb(err)
    })
  }
}

module.exports = {
  validateRedeemCode,
  deleteCard,
  deleteSubscription,
  createSubscription,
  getTax,
  createCustomerWithCard
}
