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

    <tr className="row" onClick={handleClick}>
        <td className='row-item'>{name}</td>
        <td className='row-item'>{code}</td>
        <td className='row-item'>{desc}</td>

    </tr>
  )
}

export default Row