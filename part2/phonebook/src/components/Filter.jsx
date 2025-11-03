const Filter = ({
    onFilterTyping, filterName
}) => <div>
          name: <input type='text' onChange={onFilterTyping} value={filterName}/>
      </div>

export default Filter