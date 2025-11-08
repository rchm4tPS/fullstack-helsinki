import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

const blogs = [
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
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
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
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('Test fetching most favorite blogs', () => {
  test(
    '#1 :: when there is zero blog, return null',
    () => {
      const listWithNoBlog = []

      assert.deepStrictEqual(listHelper.favoriteBlog(listWithNoBlog), null)
    }
  )

  test(
    '#2 :: when there is only one blog with likes of zero, return that blog',
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

      assert.deepStrictEqual(
        listHelper.favoriteBlog(listWithOneBlog),
        listWithOneBlog[0]
      )
    }
  )

  test(
    '#3 :: when there is only one blog with numbered likes, return that blog',
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

      assert.deepStrictEqual(
        listHelper.favoriteBlog(listWithOneBlog),
        listWithOneBlog[0]
      )
    }
  )

  test(
    `#4 :: when there are two or more blogs with same highest likes number among others, 
    return the first one encountered`,
    () => {
      const listWithTwoHighestLikesBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Go Away, The Mental Sickness!',
          author: 'Edgar Poe',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/EdgarPoe7f9.pdf',
          likes: 28,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fa',
          title: 'Mine',
          author: 'Miriam Matembe',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Miriam7fa.pdf',
          likes: 10,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fb',
          title: 'Recipe for Better Life: Introduction',
          author: 'Olga Korakovich',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Olga7fb.pdf',
          likes: 28,
          __v: 0
        }
      ]

      assert.deepStrictEqual(
        listHelper.favoriteBlog(listWithTwoHighestLikesBlog),
        listWithTwoHighestLikesBlog[1]
      )
    }
  )

  test(
    '#5 :: when there is one blog with the highest likes among others, return that particular object',
    () => {
      assert.deepStrictEqual(
        listHelper.favoriteBlog(blogs),
        blogs[2]
      )
    }
  )
})