import config from './utils/config.js'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import bloglistRouter from './controllers/bloglist.js'
import Blog from './models/bloglist.js'

const PORT = config.PORT

const app = express()

// Middleware: Morgan
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

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB instance!')
  })
  .catch(err => {
    logger.error(err)
  })

app.use(express.static('dist'))
app.use(express.json())

app.get('/info', (req, res, next) => {
  Blog.find({})
    .then(fetched => {
      res.send(`
        <p>Blog database has info for ${fetched.length} blogs.</p>
        <p>${new Date().toString()}</p>
      `)
    })
    .catch(err => next(err))
})

app.use('/api/blogs', bloglistRouter)

app.use(middleware.handleUnknownEndpoint)
app.use(middleware.handleError)

export default app