import express from 'express'

const PORT = 3001

const app = express()
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Routers

// GET group
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const personId = req.params.id
    const person = persons.find(person => person.id === personId)

    if (person) {
        res.json(person)
    } else {
        res.status(404).json({
            error: `Person with ID ${personId} could not be found!`
        }).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>    
    `).end()
})

// POST group
app.post('/api/persons', (req, res) => {
    const newName = req.body.name
    const newNumber = req.body.number

    if (newName && newNumber) {
        const isNameAlreadyExist = persons.find(person => person.name === newName)

        if (!isNameAlreadyExist) {
            const newDataToAdd = {
                id: String(Math.ceil(Math.random() * Math.pow(10,10))),
                name: newName,
                number: newNumber
            }

            persons = persons.concat(newDataToAdd)

            res.json(newDataToAdd)
        }
        else {
            return res.status(409).json({
                error: "Error: The data is already exist in the repository and could not be duplicated!"
            }).end()
        }
    } else {
        res.status(400).json({
            error: "Invalid body request! Either name or number are not passed."
        }).end()
    }
}) 

// DELETE group
app.delete('/api/persons/:id', (req, res) => {
    const personId = req.params.id
    persons = persons.filter(person => person.id !== personId)

    res.status(204).end()
})

// Listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})