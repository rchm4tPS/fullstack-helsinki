import config from './utils/config.js'
import app from './app.js'
import logger from './utils/logger.js'

// Listening
app.listen(config.PORT, () => {
  logger.info(`Connecting to ${config.MONGODB_DB_CLUSTER_SHARDS}`)
  logger.info(`Server running on http://localhost:${config.PORT}`)
})