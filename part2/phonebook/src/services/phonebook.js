import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNewPerson = async (newPerson) => {
    try {
        const response = await axios.post(baseUrl, newPerson)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

const updateExistingPerson = async (updatedId, updatedPerson) => {
    try {
        const response = await axios.put(`${baseUrl}/${updatedId}`, updatedPerson)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

const deletePerson = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

export default { getAllPersons, createNewPerson, updateExistingPerson, deletePerson }