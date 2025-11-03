const Persons = ({getPersons}) => {
    const persons = getPersons()

    const renderedNames = persons.map(person => (
        <p key={person.id} className='name'>
          {person.name} {person.number}
        </p>
      ))
    
    if (renderedNames.length > 0) return (renderedNames)    
    else return "The record with than name could not be found . . ."
}

export default Persons