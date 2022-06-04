import React, { useState } from 'react'
import './Report.css'
import Header from '../../component/header/Header'
import Period from '../../component/controller/preiod/Period'
import TypeReport from '../../component/controller/typeReport/TypeReport'
import Time from '../../component/controller/time/Time'
import Select from '../../component/controller/selectInput/Select'
import List from '../../component/controller/selectInput/List'
import RowReport from '../../component/row/RowReport'
import TotalRowReport from '../../component/row/TotalRowReport'
import { useSelect } from '../../context/Provider'
import ReportController from '../../component/reportcontroller/ReportController'
import GroupData from '../../component/groupdata/GroupData'
import MonthAndYearReport from '../../component/row/MonthAndYearReport'
import BarChart from '../../component/chart/BarChart'
import LineChart from '../../component/chart/LineChart'
function Report() {
  const arr = [1, 2, 3, 4, 5, 6]
  const cd = useSelect()
  const time = cd.data.time
  const type = cd.data.type
  const revenues = ReportController.GetData()
  const shapes = [" Biểu đồ đường", "Biểu đồ cột"]
  const revenuesMonth = revenues !== undefined && GroupData.GroupDataForMonth(revenues)
  const revenuesYear = revenues !== undefined && GroupData.GroupDataForYear(revenues)
  const shape = cd.data.shape
  const chartData = {
    labels: revenues !== undefined && revenues.map((data) => data.date.toString().slice(0, 10)),
    datasets: [
      {
        label: "Doanh thu theo ngày",
        data: revenues !== undefined && revenues.map((data) => data.totalRevenue),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
  const chartDataMonth = {
    labels:Object.keys(revenuesMonth).map((key) => key),
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: Object.keys(revenuesMonth).map((key) => {
          const total = revenuesMonth[key]!== undefined && revenuesMonth[key].reduce((d,v) => {
            d.a = d.a + v.billQuantity;
            d.b = d.b + v.totalRevenue;
            return d;
        } ,{
            a:0,
            b:0,
        })
        return total.b;
        }),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
  const chartDataYear = {
    labels:Object.keys(revenuesYear).map((key) => key),
    datasets: [
      {
        label: "Doanh thu theo năm",
        data:Object.keys(revenuesYear).map((key) => {
          const total = revenuesYear[key]!== undefined && revenuesYear[key].reduce((d,v) => {
            d.a = d.a + v.billQuantity;
            d.b = d.b + v.totalRevenue;
            return d;
        } ,{
            a:0,
            b:0,
        })
        return total.b;
        }),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
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
            <span className='position-span mg-60'>{shape}</span>
            <Select cl="shape" list={<List items={shapes} typeSelect='shape' />} />
          </div>
          <div className="report-content_data-chart">
            {time === "Ngày" && shape==="Biểu đồ cột" && <BarChart chartData={chartData} />}
            {time === "Ngày" && shape===" Biểu đồ đường" && <LineChart chartData={chartData} />}
             {time === "Tháng" && shape==="Biểu đồ cột" && <BarChart chartData={chartDataMonth} />}
             {time === "Tháng" && shape===" Biểu đồ đường" && <LineChart chartData={chartDataMonth} />}
            {time === "Năm" && shape==="Biểu đồ cột" && <BarChart chartData={chartDataYear} />}
            {time === "Năm" && shape===" Biểu đồ đường" &&<LineChart chartData={chartDataYear} />}


          </div>
          <div className="horizontal"></div>
          <div className="report-content_data-table">
            <div className="report-column columns">
              <h5>{type === "Theo thời gian" ? time : "Tên khách hàng"}</h5>
              <h5>Sô lượng đơn hàng</h5>
              <h5>Doanh thu</h5>
              <h5>Chi phí</h5>
              <h5>Lợi nhuận gộp</h5>

            </div>
            <TotalRowReport value={revenues} />
            {time === "Ngày" && revenues !== undefined && revenues.map(revenue => {
              const { id, totalRevenue, billQuantity } = revenue;
              const cost = 0;
              const profit = totalRevenue - 0;
              const date = revenue.date.toString().slice(0, 10)
              return (
                <RowReport key={id} date={date} amount={billQuantity} turnover={totalRevenue} cost={cost} profit={profit} />
              )
            })}
            {time === "Tháng" && revenuesMonth !== false && Object.keys(revenuesMonth).map((key, i) => {
              return (
                <MonthAndYearReport key={i} k={key} value={revenuesMonth[key]} />
              )
            })}
            {time === "Năm" && revenuesYear !== false && Object.keys(revenuesYear).map((key, i) => {
              return (
                <MonthAndYearReport key={i} k={key} value={revenuesYear[key]} />
              )
            })}
          </div>

        </div>
        <div className="report-content_footer">

        </div>
      </div>
    </div>

  )
}

export default Report