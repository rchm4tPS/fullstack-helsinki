import { Router } from 'express'
import PhoneBook from '../models/phonebook.js'

const phonebookRouter = Router()

phonebookRouter.get('/', (req, res, next) => {
  PhoneBook.find({})
    .then(fetchedEntries => {
      res.json(fetchedEntries)
    })
    .catch(err => next(err))
})

// more specific routes before more general, parameterized ones

phonebookRouter.get('/:id', (req, res, next) => {
  const personId = req.params.id

  PhoneBook.findById(personId)
    .then(founded => {
      if (!founded) {
        return next({
          status: 404,
          name: 'NotExist',
          message: `Person with ID ${personId} not found`
        })
      }
      res.json(founded)
    })
    .catch(err => next(err))
})

phonebookRouter.post('/', (req, res, next) => {
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
      name: 'InvalidBodyReq',
      message: 'Invalid body request! Either name or number are not passed.'
    })
  }
})

phonebookRouter.put('/:id', (req, res, next) => {
  const { name, phone } = req.body

  PhoneBook.findByIdAndUpdate(
    req.params.id,
    { name, phone },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updated => {
      if (!updated) return next({
        status: 404,
        name: 'NotExist',
        message: 'Person not found!'
      })

      res.json(updated)
    })
    .catch(err => next(err))
})

phonebookRouter.delete('/:id', (req, res, next) => {
  const personId = req.params.id
  // Return deleted data object back to the front-end
  // to update its state, so the updated list can be re-rendered

  PhoneBook.findByIdAndDelete(personId)
    .then(deletedData => {
      if (!deletedData) {
        return next({
          status: 404,
          name: 'NotExist',
          message: `Could not delete person with ID ${personId} which does not exist!`
        })
      }
      res.status(200).json(deletedData)
    })
    .catch(err => next(err))
})

export default phonebookRouter