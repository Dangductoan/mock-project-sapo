import React, { useState } from 'react'
import AccountantService from '../../api/AccountantService'
import { useHistory } from 'react-router-dom'
import './ListAccountant.css'
function ListAccountant(props) {
  const [idlist,setIdList] = useState([]);
  const handleClick = () => {
    props.setAccountant({
      username:props.username,
      name:props.name,
      phoneNumber:props.phone,
      address:props.address

    })
    props.setShow(!props.show)
    props. setIndex(props.index)
  }

  const handleChange = (id) => {
   idlist.push(id);
   setIdList(idlist);
   console.log(idlist)
  }
  return (
    <div className="list" >
        <div><input className="checkAccountant" type="checkbox"  onChange={()=>handleChange(props.index)} data-indeterminate="false" value=""/></div>
        <h3 className='list-item' onClick={handleClick}>{props.name}</h3>
        <h3 className='list-item' onClick={handleClick}>{props.phone}</h3>
        <h3 className='list-item' onClick={handleClick}>{props.address}</h3>
        <h3 className='list-item' onClick={handleClick}>{props.createdAt}</h3>
    </div>
  )
}

export default ListAccountant