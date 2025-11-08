import express from 'express'
import morgan from 'morgan'

import PhoneBook from './models/phonebook.js'

const PORT = process.env.PORT

const app = express()

app.use(express.static('dist'))
app.use(express.json())

// Middleware: Morgan
// if using tiny configuration (for exercise 3.7)
// app.use(morgan('tiny'))

morgan.token('body', (req) => {
  if (req.body && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body)
  }

  return '-'
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms', '-',
      tokens.body(req, res)
    ].join(' ')
  })
)

// Routers

// GET group
app.get('/api/persons', (req, res, next) => {
  PhoneBook.find({}).then(fetchedEntries => {
    res.json(fetchedEntries)
  })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const personId = req.params.id

  PhoneBook.findById(personId)
    .then(founded => {
      if (!founded) {
        return next({
          status: 404,
          message: `Person with ID ${personId} not found`
        })
      }
      res.json(founded)
    })
    .catch(err => next(err))
})

app.get('/info', (req, res, next) => {
  PhoneBook.find({})
    .then(fetched => {
      res.send(`
                <p>Phonebook has info for ${fetched.length} people</p>
                <p>${new Date().toString()}</p>    
            `)
    })
    .catch(err => next(err))
})

// POST group
app.post('/api/persons', (req, res, next) => {
  const newName = req.body.name
  const newNumber = req.body.phone

  if (newName && newNumber) {
    const newDataToAdd = new PhoneBook({
      name: newName,
      phone: newNumber
    })

    newDataToAdd.save()
      .then(savedData => {
        res.json(savedData)
      })
      .catch(err => next(err))

  } else {
    next({
      status: 400,
      message: 'Invalid body request! Either name or number are not passed.'
    })
  }
})

// PUT group
app.put('/api/persons/:id', (req, res, next) => {
  const { name, phone } = req.body

  PhoneBook.findByIdAndUpdate(
    req.params.id,
    { name, phone },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updated => {
      if (!updated) return next({
        status: 404,
        message: 'Person not found!'
      })

      res.json(updated)
    })
    .catch(err => next(err))
})

// DELETE group
app.delete('/api/persons/:id', (req, res, next) => {
  const personId = req.params.id
  // Return deleted data object back to the front-end
  // to update its state, so the updated list can be re-rendered

  PhoneBook.findByIdAndDelete(personId)
    .then(deletedData => {
      if (!deletedData) {
        return next({
          status: 404,
          message: `Could not delete person with ID ${personId} which does not exist!`
        })
      }
      res.status(200).json(deletedData)
    })
    .catch(err => next(err))
})

const errorHandler = (err, req, res) => {
  console.error(err.name, err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  // handle custom thrown errors
  return res.status(err.status || 500).json({
    error: err.message || 'Something went wrong on the server!'
  })
}

app.use(errorHandler)

// Listening
app.listen(PORT, () => {
  console.log(`Connecting to ${process.env.MONGODB_DB_CLUSTER_SHARDS}`)
  console.log(`Server running on http://localhost:${PORT}`)
})