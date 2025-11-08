import config from './utils/config.js'
import express from 'express'
import mongoose from 'mongoose'

import bloglistRouter from './controllers/bloglist.js'
// import Blog from './models/bloglist.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

const PORT = config.PORT

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB instance!')
    })
    .catch(err => {
        logger.error(err)
    })

app.use(express.json())

app.use('/api/blogs', bloglistRouter)

app.use(middleware.handleUnknownEndpoint)
app.use(middleware.handleError)

export default app