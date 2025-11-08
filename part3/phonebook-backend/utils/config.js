import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001
const MONGODB_URL_CONNECTION_V1_PREFIX = process.env.MONGODB_URL_CONNECTION_V1_PREFIX
const MONGODB_DB_USER = process.env.MONGODB_DB_USER
const MONGODB_DB_PASSWORD = process.env.MONGODB_DB_PASSWORD
const MONGODB_DB_CLUSTER_SHARDS = process.env.MONGODB_DB_CLUSTER_SHARDS
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME

const MONGODB_URI = `${MONGODB_URL_CONNECTION_V1_PREFIX}${MONGODB_DB_USER}:${MONGODB_DB_PASSWORD}@${MONGODB_DB_CLUSTER_SHARDS}/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

if (!MONGODB_DB_USER || !MONGODB_DB_PASSWORD) {
  console.error('FATAL ERROR: Database credentials are not defined in the environment.')
  process.exit(1) // Exit the application if config is invalid
}

export default {
  PORT,
  MONGODB_DB_CLUSTER_SHARDS,
  MONGODB_URI // Export the ready-to-use URL
}