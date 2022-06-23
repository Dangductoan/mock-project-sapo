import React from 'react'
import Select from '../selectInput/Select'
import List from '../selectInput/List'
import { useSelect } from '../../../context/Provider'

function TypeReport() {
  const types = ['Theo thời gian', 'Theo khách hàng', 'Theo loại phiếu thu','Theo nhân viên kế toán']
  const cd = useSelect()
  return (
    <div className="controller-typeReport flex mlr-50">
      <span >Loại báo cáo</span>
      <div className="select-typeReport pd-l-5 w-220">
        <span className='position-span'>{cd.data.type}</span>

        <Select list={<List items={types} typeSelect='type' />} />
      </div>
     
    </div>
  )
}

export default TypeReport