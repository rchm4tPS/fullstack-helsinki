import { Router } from 'express'
import Blog from '../models/bloglist.js'

const bloglistRouter = Router()

bloglistRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then(blogs => {
      if (blogs.length > 0) return res.json(blogs)

      res.json({
        message: 'No data in database. Try to add some data first!'
      })
    })
    .catch(err => next(err))
})

bloglistRouter.get('/:id', (req, res, next) => {
  const blogId = req.params.id

  Blog.findById(blogId)
    .then(foundedBlog => {
      if (!foundedBlog) {
        return next({
          status: 404,
          name: 'NotExist',
          message: `Blog with ID ${blogId} not found`
        })
      }

      res.json(foundedBlog)
    })
    .catch(err => next(err))
})

bloglistRouter.post('/', (req, res, next) => {
  const bodyReq = req.body
  const newBlog = new Blog(bodyReq)

  newBlog.save()
    .then(savedBlog => {
      if (savedBlog) {
        return res.json(savedBlog)
      }

      next({
        status: 400,
        name: 'InvalidBodyReq',
        message: 'Invalid body request! Required fields might be missing.'
      })
    })
    .catch(err => next(err))
})

bloglistRouter.put('/:id', (req, res, next) => {
  const blogId = req.params.id
  const bodyReq = req.body

  Blog.findByIdAndUpdate(
    blogId,
    bodyReq,
    { new: true, runValidators: true, context: 'query' }
  ).then(updatedBlog => {
    if (!updatedBlog) {
      return next({
        status: 404,
        name: 'NotExist',
        message: `Blog with ID ${blogId} not found`
      })
    }

    res.json(updatedBlog)
  }).catch(err => next(err))
})

bloglistRouter.delete('/:id', (req, res, next) => {
  const blogId = req.params.id

  Blog.findByIdAndDelete(blogId)
    .then(deletedBlog => {
      if (!deletedBlog) {
        return next({
          status: 404,
          name: 'NotExist',
          message: `Blog with ID ${blogId} not found`
        })
      }

      res.status(200).json(deletedBlog)
    })
    .catch(err => next(err))
})

export default bloglistRouter