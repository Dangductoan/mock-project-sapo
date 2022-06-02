import React,{useState} from 'react'
import './Arrow.css'
function Arrow() {
  const [isActive,setIsACtive] = useState(false)
  const handleClick = () => {
    setIsACtive(!isActive)
    document.querySelector('.sidebar-subList').classList.toggle('block')
  }
  return (
          <svg onClick={handleClick} className={`MuiSvgIcon-root  rorate-2 ${isActive ? 'rorate-0' : ''} `} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
  )
}

export default Arrow