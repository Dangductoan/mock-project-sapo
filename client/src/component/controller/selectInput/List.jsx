import React,{useState,useEffect} from 'react'
import {useSelect} from '../../../context/Provider'
function List({ items,typeSelect}) {
    const cd = useSelect()
    const [option,setOption] = useState(cd.data)
    const handleClick = (e) => {
        setOption({
            ...option,
            [typeSelect]:e.target.innerHTML
        })
        
        
    }
  useEffect(() => {
    cd.receiveData(option)
  },[cd,option])
    return (
        <>
            {items.map((item,index) =>
            (<li key={index} onClick={handleClick} >
                {item}
            </li>))}
        </>
    )
}

export default List
