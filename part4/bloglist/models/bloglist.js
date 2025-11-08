import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: [true, 'Blog title is required']
  },
  author: {
    type: String,
    minLength: 3,
    required: [true, 'Blog author is required']
  },
  url: {
    type: String,
    validate: {
      validator: (u) => /^(https?:\/\/)?(www\.)?[\w\.\/\-]{5,256}$/.test(u),
      message: props => `${props.value} is not a valid URL!`
    },
    required: [true, 'Blog URL is required']
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedBlogs) => {
    returnedBlogs.id = returnedBlogs._id.toString()
    delete returnedBlogs._id
    delete returnedBlogs.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog