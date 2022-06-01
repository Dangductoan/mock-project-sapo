import React, { useState } from 'react'
import AccountantService from '../../api/AccountantService'
import { useHistory } from 'react-router-dom'
import './ListAccountant.css'
function ListAccountant(props) {
  const [idlist,setIdList] = useState([]);
  let history=useHistory();
  const handleClick = () => {
    props.setShow(!props.show)
    props. setIndex(props.index)
  }
  // AccountantService.deleteAccountant(id);
  // console.log('delete')
  // history.push('/chief-accountant/user')
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