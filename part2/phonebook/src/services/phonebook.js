import axios from 'axios'
const baseUrl = '/api/persons' // if this service want to be built with backend
const DEFAULT_UPDATE_OR_DELETE_MSG = `Either because the server couldn't handle the request or the data has been deleted.`

const getAllPersons = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch(err) {
        throw err
        // throw new Error(err + ` :: Failed to fetch all person contact . . .`)
    }
}

const createNewPerson = async (newPerson) => {
    try {
        const response = await axios.post(baseUrl, newPerson)
        return response.data
    } catch (err) {
        throw err
        // throw new Error(err + ` :: Failed to create new person contact . . .`)
    }
}

const updateExistingPerson = async (updatedId, updatedPerson) => {
    try {
        const response = await axios.put(`${baseUrl}/${updatedId}`, updatedPerson)
        return response.data
    } catch (err) {
        throw err
        // throw new Error(`Failed to update existing person contact. ${DEFAULT_UPDATE_OR_DELETE_MSG}`)
    }
}

const deletePerson = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`)
        return response.data
    } catch (err) {
        throw err
        // throw new Error(`Failed to delete that person contact. ${DEFAULT_UPDATE_OR_DELETE_MSG}`)
    }
}

export default { getAllPersons, createNewPerson, updateExistingPerson, deletePerson }