import config from './utils/config.js'
import logger from './utils/logger.js'
import app from './app.js'

// Listen
app.listen(config.PORT, () => {
  logger.info(`Connecting to ${config.MONGODB_DB_CLUSTER_SHARDS}`)
  logger.info(`Server is running on PORT ${config.PORT}`)
})