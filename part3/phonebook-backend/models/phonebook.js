import mongoose from 'mongoose';

const {
    MONGODB_URL_CONNECTION_V1_PREFIX,
    MONGODB_URL_CONNECTION_V2_PREFIX,
    MONGODB_DB_USER,
    MONGODB_DB_PASSWORD,
    MONGODB_DB_CLUSTER_SHARDS,
    MONGODB_DB_NAME
} = process.env

// Use this as a primary URL
// Because apparantly my ISP blocked the connection that
// use SRV/TXT in IPv4 connection.
const url = `${MONGODB_URL_CONNECTION_V1_PREFIX}${MONGODB_DB_USER}:${MONGODB_DB_PASSWORD}@${MONGODB_DB_CLUSTER_SHARDS}/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

// Use this url (uncomment) when using other internet source like from WiFi
// const url = `${MONGODB_URL_CONNECTION_V2_PREFIX}${MONGODB_DB_USER}:${password}@cluster0.siuncux.mongodb.net/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    phone: String
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

export default PhoneBook