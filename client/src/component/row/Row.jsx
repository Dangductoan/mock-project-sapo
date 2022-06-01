import React from 'react'
import './Row.css'
function Row({name,code,desc,index,show,setShow,setIndex,handleBillCategory}) {
  const handleClick = () => {
    setShow(!show)
    setIndex(index)
    handleBillCategory({
      name:name,
      code:code,
      desc:desc
    })
  }
  return (
    <div className="row" onClick={handleClick}>
        <h3 className='row-item'>{name}</h3>
        <h3 className='row-item'>{code}</h3>
        <h3 className='row-item'>{desc}</h3>

    </div>
  )
}

export default Row