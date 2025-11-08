import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

describe('Test total likes', () => {
  test(
    '#1 :: when there is zero blog, return zero as total number of likes',
    () => {
      const listWithNoBlog = []

      assert.strictEqual(listHelper.totalLikes(listWithNoBlog), 0)
    }
  )

  test(
    '#2 :: when there is only one blog with likes of zero, return zero as total number of likes',
    () => {
      const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 0,
          __v: 0
        }
      ]

      assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 0)
    }
  )

  test(
    '#3 :: when there is only one blog, return the number of likes of itself only',
    () => {
      const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]

      assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
    }
  )

  test(
    `#4 :: when there are one blog with numbered likes and one blog with zero likes, 
     return appropriate total number of likes`,
    () => {
      const listWithTwoMixedNumberOfLikes = [
        {
          _id: '5a422b891b54a676234d17fa',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422ba71b54a676234d17fb',
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
          likes: 0,
          __v: 0
        },
      ]

      assert.strictEqual(listHelper.totalLikes(listWithTwoMixedNumberOfLikes), 10)
    }
  )

  test(
    '#5 :: when there are one blog with numbered likes, return appropriate total number of likes',
    () => {
      const listOfNumberedLikesBlogs = [
        {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
      ]

      assert.strictEqual(listHelper.totalLikes(listOfNumberedLikesBlogs), 12)
    }
  )
})