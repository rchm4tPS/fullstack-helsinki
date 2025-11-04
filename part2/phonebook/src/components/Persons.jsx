const Persons = ({getPersons, onClickDeleteBtn}) => {
    const renderedNames = getPersons().map(person => (
        <div key={person.id} className="person-line">
          <p className='name'>
            {person.name} {person.number}
          </p>
          <span className="space"></span>
          <button 
            type="button" 
            data-id={person.id} 
            className="btn-delete"
            onClick={onClickDeleteBtn}
          >
            delete
          </button>
        </div>
      ))
    
    if (renderedNames.length > 0) return (renderedNames)    
    else return "The record with than name could not be found . . ."
}

export default Persons