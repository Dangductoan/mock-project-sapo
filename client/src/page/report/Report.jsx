import React from 'react'
import './Report.css'
import Header from '../../component/header/Header'
import Period from '../../component/controller/preiod/Period'
import TypeReport from '../../component/controller/typeReport/TypeReport'
import Time from '../../component/controller/time/Time'
function Report() {
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

        </div>
      </div>
    </div>

  )
}

export default Report