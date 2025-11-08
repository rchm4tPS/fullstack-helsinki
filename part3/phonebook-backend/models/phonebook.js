import mongoose from 'mongoose'

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Why don\'t enter your name?']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: (p) => /^\d{2,3}-\d{5,}$/.test(p),
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required!']
  }
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