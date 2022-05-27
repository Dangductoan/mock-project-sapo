import React from 'react'
import './Row.css'
function Row({name,code,desc,id,show,setShow}) {
  const handleClick = (id) => {
    setShow(!show)
  }
  return (
    <div className="row" key={id} onClick={handleClick}>
        <h3 className='row-item'>{name}</h3>
        <h3 className='row-item'>{code}</h3>
        <h3 className='row-item'>{desc}</h3>

    </div>
  )
}

export default Row