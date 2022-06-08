import React from 'react'
import './Report.css'
import Header from '../../component/header/Header'
import Period from '../../component/controller/preiod/Period'
import TypeReport from '../../component/controller/typeReport/TypeReport'
import Time from '../../component/controller/time/Time'
import ReportForTime from './reporttype/ReportForTime'
import ReportForCustomer from './reporttype/ReportForCustomer'
import ReportForBillCategory from './reporttype/ReportForBillCategory'
import { useSelect } from '../../context/Provider'
function Report() {
  const cd = useSelect()
  const type = cd.data.type
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
          {type === "Theo thời gian" && <ReportForTime />}
          {type === "Theo khách hàng" && <ReportForCustomer />}
          {/* {type==="Theo nhân viên kế toán" && <ReportForAccountant/>} */}
          {type === "Theo loại phiếu thu" && <ReportForBillCategory />}

        </div>
        <div className="report-content_footer">

        </div>
      </div>
      <div className="model-overlay" >

      </div>
    </div>

  )
}

export default Report