import React,{useState} from 'react'
import Select from '../selectInput/Select'
import List from '../selectInput/List'
import {useSelect} from '../../../context/Provider'
function Time() {
    const dates = ['Ngày','Tháng','Năm']
    const cd = useSelect()
    const isTime = Boolean(cd.data.type === 'Theo thời gian')
    return (
        <div className={`controller-time flex ${isTime ? '' : 'none'}`}>
            <span>Nhóm theo</span>
            <div className="select-time pd-l-5 w-150">
               <span className='position-span'>{cd.data.time}</span>
                <Select  list={<List  items={dates} typeSelect='time' />}/>
            </div>
       
        </div>
    )
}

export default Time