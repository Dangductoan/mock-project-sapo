import React from 'react'
import Select from '../selectInput/Select'
import DatePicker from './Demo'
function Period() {
  return (
    <div className="controller-period flex">
      <span >Khoảng thời gian</span>
       <DatePicker/>
    </div>
  )
}

export default Period