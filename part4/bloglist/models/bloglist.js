import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
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