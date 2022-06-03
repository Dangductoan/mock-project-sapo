import React,{useState} from 'react'
import './Report.css'
import Header from '../../component/header/Header'
import Period from '../../component/controller/preiod/Period'
import TypeReport from '../../component/controller/typeReport/TypeReport'
import Time from '../../component/controller/time/Time'
import Select from '../../component/controller/selectInput/Select'
import List from '../../component/controller/selectInput/List'
import RowReport from '../../component/row/RowReport'
import { useSelect } from '../../context/Provider'
import ReportController from '../../component/reportcontroller/ReportController'
function Report() {
  const cd = useSelect()
  const revenues = ReportController.GetData()
  const shapes = ["Biểu diễn dưới dạng bảng", "Biểu diễn dưới dạng biểu đồ"]
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
            <Select cl="shape" list={<List items={shapes} typeSelect='shape' />} />
          </div>
          <div className="report-content_data-table">
            <div className="report-column columns">
              <h5>Ngày</h5>
              <h5>Sô lượng đơn hàng</h5>
              <h5>Doanh thu</h5>
              <h5>Chi phí</h5>
              <h5>Lợi nhuận gộp</h5>

            </div>
            {revenues!== undefined && revenues.map(revenue => {
              const {id,totalRevenue,billQuantity} = revenue;
              const cost = 0.8*totalRevenue;
              const profit = 0.2*totalRevenue
              const date = revenue.date.toString().slice(0, 10)
              return (
                <RowReport key={id}date={date} amount={billQuantity} turnover={totalRevenue} cost={cost} profit={profit} />
              )
            })}
          </div>
          <div className="report-content_data-chart">

          </div>
        </div>
      </div>
    </div>

  )
}

export default Report