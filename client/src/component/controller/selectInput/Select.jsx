import React,{useState} from 'react'
import "./Select.css"

function Select({list}) {
    const [show,setShow] = useState(false)
    const [isActive,setActive] = useState(false)
   
    const handleClick = () => {
        setShow(!show)
        setActive(!isActive)
    }
    window.onclick = () => {
      if(show) {
        setShow(false)
      }else {
        console.log("hhh")
      }
    }
    
     
  
  return (
    <>
    <div className="select-form">
        <div className={`select-form_input ${isActive ? 'active' : ''}`}>
             <svg onClick={handleClick} className={`MuiSvgIcon-root ${isActive ? 'rorate' : ''} `} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
        </div>
        {show && <div className="select-form_list">
                <ul>
                    {list}
                </ul>
        </div>}
    </div>
    <div className="model-overlay" >
     
    </div>
    </>
      
    
  )
}

export default Select