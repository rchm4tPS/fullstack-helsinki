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

export default {
  dummy,
  totalLikes,
  favoriteBlog
}