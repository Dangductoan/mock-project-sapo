import React,{useState,useEffect} from 'react'
import "./Select.css"

function Select({list,cl}) {
    const [show,setShow] = useState(false)
    const [isActive,setActive] = useState(false)
    const handleClick = () => {
        setShow(!show)
        setActive(!isActive)
        document.querySelector('.model-overlay').classList.toggle('block')
    }
    useEffect(() => {
      document.querySelector('.model-overlay').addEventListener('click',function() {
        document.querySelector('.model-overlay').classList.remove('block')
        setShow(false)
        setActive(false)
      })

    },[show,isActive])
  
    
    
     
  
  return (
    <>
    <div className={`select-form ${cl}`}>
        <div className="select-form_input">
             <svg onClick={handleClick} className={`MuiSvgIcon-root ${isActive ? 'rorate' : ''} `} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
        </div>
        {show && <div className="select-form_list">
                <ul>
                    {list}
                </ul>
        </div>}
    </div>
   
    </>
      
    
  )
}

export default Select