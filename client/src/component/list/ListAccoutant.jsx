import React from 'react'
import './ListAccountant.css'
function ListAccountant(props) {
  const handleClick = () => {
    props.setShow(!props.show)
    props. setIndex(props.index)
  }
  return (
    <div className="list" onClick={handleClick}>
        <h3 className='list-item'>{props.name}</h3>
        <h3 className='list-item'>{props.phone}</h3>
        <h3 className='list-item'>{props.address}</h3>
        <h3 className='list-item'>{props.createdAt}</h3>

    </div>
  )
}

export default ListAccountant