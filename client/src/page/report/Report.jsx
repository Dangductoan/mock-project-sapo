import React from 'react'
import './Report.css'
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
      <div className="report-header">
        {/* <button className="btn report-header_btn ">
        <svg className="MuiSvgIcon-root" style={{width:'15px'}} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M10 2H20C21.1523 2 22 2.84772 22 4V14C22 15.1523 21.1523 16 20 16H16V20C16 21.1523 15.1523 22 14 22H4C2.84772 22 2 21.1523 2 20V10C2 8.84772 2.84772 8 4 8H8V4C8 2.84772 8.84772 2 10 2ZM8 10H4V20H14V16H10C8.84772 16 8 15.1523 8 14V10ZM10 4V14H20V4H10Z" fill="currentColor"></path></svg>
            Nhân bản</button> */}
        {/* <button className="btn report-header_btn">
        <svg className="MuiSvgIcon-root"  style={{width:'10px'}} focusable="false" viewBox="0 0 14 20" aria-hidden="true"><path d="M6 8.74228e-08L6 12.17L2.41 8.59L1 10L7 16L13 10L11.59 8.59L8 12.17L8 0L6 8.74228e-08Z" fill="currentColor"></path><path d="M0 18H14V20H0V18Z" fill="currentColor"></path></svg>
            Xuất báo cáo</button> */}


      </div>
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