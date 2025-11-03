const Persons = ({getAllPersons, persons}) => {
    const renderedNames = getAllPersons()
    
    if (renderedNames.length > 0) return (renderedNames)    
    else {
        if (persons.length > 0 ) return "The record with than name could not be found . . ."
        else return "Add some number first . . ."
    }
}

export default Persons