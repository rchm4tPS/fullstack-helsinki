const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((total, blog) => total + blog.likes, 0)
    : 0
}

export default {
  dummy,
  totalLikes
}