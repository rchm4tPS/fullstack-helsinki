import _ from 'lodash'

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((total, blog) => total + blog.likes, 0)
    : 0
}

const favoriteBlog = (blogs) => {
  return (
    blogs.reduce((maxObj, obj) => {
      return (!maxObj || obj.likes > maxObj.likes) ? obj : maxObj
    }, null)
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const counts = _.countBy(blogs, 'author')
    const max = _.max(_.values(counts))

    return Object.entries(counts)
      .filter(([author, count]) => count === max)
      .map(([author, count]) => ({ author, blogs: count }))
  } else {
    return {}
  }
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}