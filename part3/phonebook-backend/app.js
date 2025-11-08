import config from './utils/config.js'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import phonebookRouter from './controllers/phonebook.js'
import PhoneBook from './models/phonebook.js'

const PORT = config.PORT

const app = express()

// Middleware: Morgan
// if using tiny configuration (for exercise 3.7)
// app.use(morgan('tiny'))

morgan.token('body', (req) => {
  if (req.body && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body)
  }

  return '-'
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms', '-',
      tokens.body(req, res)
    ].join(' ')
  })
)

// Use this as a primary URL
// Because apparantly my ISP blocked the connection that
// use SRV/TXT in IPv4 connection.
// const url = `${MONGODB_URL_CONNECTION_V1_PREFIX}${MONGODB_DB_USER}:${MONGODB_DB_PASSWORD}@${MONGODB_DB_CLUSTER_SHARDS}/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

// Use this url (uncomment) when using other internet source like from WiFi
// const url = `${MONGODB_URL_CONNECTION_V2_PREFIX}${MONGODB_DB_USER}:${password}@cluster0.siuncux.mongodb.net/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())

app.get('/info', (req, res, next) => {
  PhoneBook.find({})
    .then(fetched => {
      res.send(`
        <p>Phonebook has info for ${fetched.length} people</p>
        <p>${new Date().toString()}</p>    
      `)
    })
    .catch(err => next(err))
})

app.use('/api/persons', phonebookRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app