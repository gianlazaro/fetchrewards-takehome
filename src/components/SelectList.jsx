// Creates a select list from an array
// Provides a 'format' prop for reuse with State's array list of objs

function SelectList({list, listId, handleChange, value, format = (item)=> item}) {
  return (
    <select id={listId} defaultValue={value || "default"} onChange={handleChange} required>
        <option value={"default"} disabled>
          Choose your {listId}
        </option>
      {list.map((item)=> (
        <option value={format(item)} key={format(item)} >{format(item)}</option>
      ))}
    </select>
  )
}

export default SelectList;