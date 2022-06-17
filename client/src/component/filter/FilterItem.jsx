import React from 'react'
import "./FilterItem.css"
import DeleteIcon from '@mui/icons-material/Delete';
function FilterItem({name,type,option,setOption}) {
  const handleClick = () => {
    const id = option.indexOf(type)
    const newOption = [...option];
    newOption.splice(id,1)
   setOption(newOption);
  }
  return (
    <div className="filter-item">
        <div className="filter-item_title">
             <span>{name}</span>
        </div>
        <div className="filter-item_option">
         {/* <option value=""></option> */}
        </div>
        <div className="filter-item_remove" onClick={handleClick}>
        <DeleteIcon/>
        </div>
    </div>
  )
}

export default FilterItem