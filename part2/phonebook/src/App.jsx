import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('enter new name')
  const [newNumber, setNewNumber] = useState('enter your number')
  
  const renderAllNames = () =>
    persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => (
        <p key={person.id} className='name'>
          {person.name} {person.number}
        </p>
      ))

  const handleNewData = (event) => {
    event.preventDefault()

    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat({ 
        id: persons.at(persons.length - 1)?.id + 1 || 1,
        name: newName,
        number: newNumber
      }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleFilterTyping = (event) => {
    setFilter(event.target.value)
  }

  const handleNameTyping = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberTyping = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons getAllPersons={renderAllNames} persons={persons} />
    </div>
  )
}

export default App