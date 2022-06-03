import React, { useState } from 'react'
import './ListCustomer.css'
function ListCustomer(props) {
    const handleClick = () => {
      props.setCustomer({
        code:props.code,
        name:props.name,
        phone:props.phoneNumber,
        groupCustomer:props.groupCustomer,
        createdBy:props.createdBy,
        address:props.address
      })
      props.setShow(!props.show)
      props. setIndex(props.index)
    }
  
    const handleChange = (id) => {
  
    }
    return (
      <div className="list" >
          <div><input className="checkCustomer" type="checkbox"  onChange={()=>handleChange(props.index)} data-indeterminate="false" value=""/></div>
          <h3 className='list-item-customer' onClick={handleClick}>{props.code}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.name}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.phoneNumber}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.groupCustomer}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.createdBy}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.address}</h3>
          <h3 className='list-item-customer' onClick={handleClick}>{props.createdAt}</h3>


      </div>
    )
}

export default ListCustomer;