import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv()

const {
    MONGODB_URL_CONNECTION_V1_PREFIX,
    MONGODB_URL_CONNECTION_V2_PREFIX,
    MONGODB_DB_USER,
    MONGODB_DB_PASSWORD,
    MONGODB_DB_CLUSTER_SHARDS,
    MONGODB_DB_NAME
} = process.env

const argsLength = process.argv.length
let operationType = ""
const ADD_NEW_DATA = 'add_new_data'
const FETCH_ALL_DATA = 'fetch_all_data'

if (argsLength < 3) {
    console.log('give password as argument')
    process.exit(1)
}
else if (argsLength === 4) {
    console.log('Please give the 2nd arguments for phone number!')
    process.exit(1)
}
else if (argsLength > 5) {
    console.log('Too much arguments given! Expecting 2 arguments at maximum!')
    process.exit(1)
}
else if (argsLength === 3) {
    operationType = FETCH_ALL_DATA
}
else if (argsLength === 5) {
    operationType = ADD_NEW_DATA
}

const password = encodeURIComponent(process.argv[2]) || MONGODB_DB_PASSWORD
const newEntryName = process.argv[3]
const newEntryPhone = process.argv[4]

// Use this as a primary URL
// Because apparantly my ISP blocked the connection that
// use SRV/TXT in IPv4 connection.
const url = `${MONGODB_URL_CONNECTION_V1_PREFIX}${MONGODB_DB_USER}:${password}@${MONGODB_DB_CLUSTER_SHARDS}/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

// Use this url (uncomment) when using other internet source like from WiFi
// const url = `${MONGODB_URL_CONNECTION_V2_PREFIX}${MONGODB_DB_USER}:${password}@cluster0.siuncux.mongodb.net/${MONGODB_DB_NAME}?ssl=true&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

if (operationType === ADD_NEW_DATA) {
    const newNumber = new PhoneBook({
        name: String(newEntryName),
        phone: String(newEntryPhone)
    })

    newNumber.save().then(res => {
        console.log(`added ${newEntryName} number ${newEntryPhone} to phonebook`);
        mongoose.connection.close()
    })
} else if (operationType === FETCH_ALL_DATA) {
    PhoneBook.find({}).then(result => {
        console.log("phonebook:");
        
        if (result.length > 0) {
            result.forEach(phone => {
                console.log(phone.name, phone.phone)
            })
        } else {
            console.log("Empty records . . .");
        }

        mongoose.connection.close()
    })
}