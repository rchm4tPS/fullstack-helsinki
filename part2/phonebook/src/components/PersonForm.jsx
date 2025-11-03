const PersonForm = ({
    onPersonFormSubmit,
    onInputNameChange, name,
    onInputNumberChange, number
}) => {
    return (
        <form onSubmit={onPersonFormSubmit}>
            <div>
            name: <input type='text' onChange={onInputNameChange} value={name}/>
            </div>
            <div>
            number: <input onChange={onInputNumberChange} value={number}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm