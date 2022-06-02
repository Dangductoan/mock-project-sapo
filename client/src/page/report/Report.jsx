import React from 'react'
import './Report.css'
import Header from '../../component/header/Header'
import Period from '../../component/controller/preiod/Period'
import TypeReport from '../../component/controller/typeReport/TypeReport'
import Time from '../../component/controller/time/Time'
import Select from '../../component/controller/selectInput/Select'
import List from '../../component/controller/selectInput/List'
import { useSelect } from '../../context/Provider'
function Report() {
  const cd = useSelect()
  const shapes = ["Biểu diễn dưới dạng bảng","Biểu diễn dưới dạng biểu đồ"]
  return (
    <div className="report ml-230">
      <Header />
      <div className="report-content">
        <div className="report-content_title">
          <h3>Hoạt động kinh doanh</h3>
          <p>Ghi nhận theo ngày giao hàng thành công</p>
        </div>
        <div className="report-content_controller">
              <Period />
              <TypeReport />
              <Time />
        </div>
        <div className="report-content_data">
            <div className="report-content_data-option">
            <span className='position-span mg-60'>{cd.data.shape}</span>
            <Select cl="shape" list={<List  items={shapes} typeSelect='shape' />}/>
            </div>
            <div className="report-content_data-table">

            </div>
            <div className="report-content_data-chart">

            </div>
        </div>
      </div>
    </div>

  )
}

export default Report