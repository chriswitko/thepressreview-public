const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const next = require('next')
const morgan = require('morgan')
const helmet = require('helmet')
const api = require('../api')
const readers = require('../api/readers')
const channels = require('../api/channels')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('../utils/i18n')

const env = require('node-env-file')
env(path.join(__dirname, `/config/${dev ? 'development' : 'production'}`))

console.log('ENV', process.env.TEST)

console.log('folder', path.join(__dirname, '../static'))

const start = (options) => {
  return new Promise((resolve, reject) => {
    i18n
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init({
        load: 'languageOnly',
        preload: ['en'], // preload all langages , 'pl'
        ns: ['common'], // need to preload all the namespaces , 'home', 'page2'
        backend: {
          loadPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.json'),
          addPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.missing.json')
        }
      }, () => {
        app.prepare()
          .then(() => {
            if (!options.repo) {
              reject(new Error('The server must be started with a connected repository'))
            }
            if (!options.port) {
              reject(new Error('The server must be started with an available port'))
            }

            const server = express()

            let sess = {
              secret: 'new$pe11er$1125',
              resave: true,
              saveUninitialized: true,
              cookie: {},
              store: new MongoStore({url: options.dbSettings.db})
            }

            if (server.get('env') === 'production') {
              server.set('trust proxy', 1) // trust first proxy
              sess.cookie.secure = true // serve secure cookies
            }

            server.use(session(sess))
            server.use(cookieParser())

            server.use(express.static('static'))

            server.use(bodyParser.json())
            server.use(bodyParser.urlencoded({ extended: true }))
            server.use(morgan('dev'))
            server.use(helmet())
            server.set('view cache', false)

            server.use(i18nextMiddleware.handle(i18n))

            api(server, options, app)
            channels(server, options)
            readers(server, options)

            server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

            server.get('/logout', (req, res, next) => {
              res.clearCookie('user_id')
              res.redirect('/')
            })

            server.get('*', (req, res) => {
              return handle(req, res)
            })

            server.use((err, req, res, next) => {
              reject(new Error('Something went wrong!, err:' + err))
              res.status(500).send('Something went wrong!')
            })

            server.listen(options.port, () => resolve(server))
          })
          .catch((ex) => {
            console.error(ex.stack)
            process.exit(1)
          })
      })
  })
}

module.exports = Object.assign({}, {start})
