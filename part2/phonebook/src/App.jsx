import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebook.js'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('enter new name')
  const [newNumber, setNewNumber] = useState('enter your number')
  const [notification, setNotification] = useState({
    type: null,
    message: null
  })

  
  useEffect(() => {
    phonebookServices.getAllPersons()
      .then(data => setPersons(data))
      .catch(err => {
          setNotification({ type: 'error', message: err.response?.data?.error || err.message || err })
          setTimeout(() => setNotification({ type: null, message: null }), 5000)
        }
      )
  }, [])

  const filteredNames = () =>
    persons
      .filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  const handleFilterTyping = (event) => {
    setFilter(event.target.value)
  }

  const handleNameTyping = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberTyping = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewData = (event) => {
    event.preventDefault()

    if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const newPersonObj = { 
        name: newName,
        phone: newNumber
      }

      phonebookServices.createNewPerson(newPersonObj)
        .then(resData => {
          setNotification({ type: 'success', message: 'Successfully added new person contact!' })
          setPersons(persons.concat(resData))
          setNewName('')
          setNewNumber('')

          setTimeout(() => setNotification({ type: null, message: null }), 5000)
        })
        .catch(err => {
          setNotification({ type: 'error', message: err.response?.data?.error || err.message || err })
          setTimeout(() => setNotification({ type: null, message: null }), 5000)
        })


    } 
    // New number for the already existing user with same name
    // will replace that user's number (PUT) if user confirm this act
    else {
      const isUpdateNumber = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)

      if (isUpdateNumber) {
        const newDataToUpdate = {
          ...persons.find(person => person.name.toLowerCase() === newName.toLowerCase()), 
          phone: newNumber
        }

        phonebookServices.updateExistingPerson(newDataToUpdate.id, newDataToUpdate)
          .then(updatedData => {
            setNotification({ type: 'success', message: 'Successfully updated person contact with new number!' })
            setTimeout(() => setNotification({ type: null, message: null }), 5000)

            setPersons(old => old.map(
              person => person.id === updatedData.id ? updatedData : person
            ))
          }
        ).catch(err => {
          setNotification({ type: 'error', message: err.response?.data?.error || err.message || err })
          setTimeout(() => setNotification({ type: null, message: null }), 5000)
        })
      }
    }
  }

  const handleDeleteOnePerson = (event) => {
    const deletedId = event.target.dataset.id
    const deletionConfirmation = window.confirm(
      `Delete ${persons.find(person => person.id === deletedId).name}`
    )

    deletionConfirmation && phonebookServices
      .deletePerson(deletedId)
      .then(deletedData => {
        setNotification({ type: 'success', message: 'Successfully deleted person contact from the database!' })
        setPersons(old => old.filter(person => person.id !== deletedData.id))
        
        setTimeout(() => setNotification({ type: null, message: null }), 5000)

      })
      .catch(err => {
          setNotification({ type: 'error', message: err.response?.data?.error || err.message || err })
          setTimeout(() => setNotification({ type: null, message: null }), 5000)
        }
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification}/>

      <Filter onFilterTyping={handleFilterTyping} filterName={filter} />

      <h3>add a new</h3>
      <PersonForm 
        onPersonFormSubmit={handleNewData}
        onInputNameChange={handleNameTyping}
        name={newName}
        onInputNumberChange={handleNumberTyping}
        number={newNumber}
      />

      <h3>Numbers</h3>
      {persons.length > 0 
        ? <Persons 
            getPersons={filteredNames} 
            onClickDeleteBtn={handleDeleteOnePerson}
          />
        : "No numbers here. Try add some new numbers . . ."
      }
    </div>
  )
}

export default App