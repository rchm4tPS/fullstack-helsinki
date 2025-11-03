const Filter = ({
    onFilterTyping, filterName
}) => <div>
          filtered based on: <input type='text' onChange={onFilterTyping} value={filterName}/>
      </div>

export default Filter