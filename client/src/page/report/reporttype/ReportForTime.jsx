import React, { useState } from 'react'
import '../Report.css'
import Select from '../../../component/controller/selectInput/Select'
import List from '../../../component/controller/selectInput/List'
import RowReport from '../../../component/row/RowReport'
import TotalRowReport from '../../../component/row/TotalRowReport'
import { useSelect } from '../../../context/Provider'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import MonthAndYearReport from '../../../component/row/MonthAndYearReport'
import BarChart from '../../../component/chart/BarChart'
import LineChart from '../../../component/chart/LineChart'
import { exports } from '../excel/ReportExcelTime'
import ConvertDataToExport from '../convert/ConvertDataToExports'
import SingleModal from '../../../component/modal/singlemodal/SingleModal'
function ReportForTime() {
  const cd = useSelect()
  const start = new Date(cd.start.getTime() - (cd.start.getTimezoneOffset() * 60000 ))
  .toISOString()
  .split("T")[0];
  const end = new Date(cd.end.getTime() - (cd.end.getTimezoneOffset() * 60000 ))
  .toISOString()
  .split("T")[0];
  const time = cd.data.time
  const shapes = [" Biểu đồ đường", "Biểu đồ cột"]
  const shape = cd.data.shape
  const revenues = ReportController.GetData()
  const revenuesMonth = revenues !== undefined && GroupData.GroupDataForMonth(revenues)
  const revenuesYear = revenues !== undefined && GroupData.GroupDataForYear(revenues)

  const revenuesCharts = revenues === undefined ? [] : [...revenues];
  revenuesCharts.push({ date: end, totalRevenue: 0 })
  revenuesCharts.unshift({ date: start, totalRevenue: 0 })
  const revenuesMonthCharts = revenuesMonth === undefined ? {} : { 0: [{ billQuantity: 0, totalRevenue: 0 }], ...revenuesMonth }
  const revenuesYearCharts = revenuesYear === undefined ? {} : { 0: [{ billQuantity: 0, totalRevenue: 0 }], ...revenuesYear };
  const excelDataDate = ConvertDataToExport.date(revenues)
  const excelDataMonth = ConvertDataToExport.monthAndYear(revenuesMonth, revenues)
  const excelDataYear = ConvertDataToExport.monthAndYear(revenuesYear, revenues)

  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);




  const exportBillListExcel = () => {

    time === "Ngày" && exports(excelDataDate, time);
    time === "Tháng" && exports(excelDataMonth, time)
    time === "Năm" && exports(excelDataYear, time)
    setOpenExportExcelModal(false);

  };
  const handleClick = () => {
    // exports(excelDataMonth)
    setOpenExportExcelModal(true)

  }
  const chartData = {
    labels: revenuesCharts !== undefined && revenuesCharts.map((data) => data.date.toString().slice(0, 10)),
    datasets: [
      {
        label: "Doanh thu theo ngày",
        data: revenuesCharts !== undefined && revenuesCharts.map((data) => data.totalRevenue),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
  const chartDataMonth = {
    labels: Object.keys(revenuesMonthCharts).map((key) => key),
    datasets: [
      {
        label: "Doanh thu theo tháng",
        data: Object.keys(revenuesMonthCharts).map((key) => {
          const total = revenuesMonthCharts[key] !== undefined && revenuesMonthCharts[key].reduce((d, v) => {
            d.a = d.a + v.billQuantity;
            d.b = d.b + v.totalRevenue;
            return d;
          }, {
            a: 0,
            b: 0,
          })
          return total.b;
        }),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
  const chartDataYear = {
    labels: Object.keys(revenuesYearCharts).map((key) => key),
    datasets: [
      {
        label: "Doanh thu theo năm",
        data: Object.keys(revenuesYearCharts).map((key) => {
          const total = revenuesYearCharts[key] !== undefined && revenuesYearCharts[key].reduce((d, v) => {
            d.a = d.a + v.billQuantity;
            d.b = d.b + v.totalRevenue;
            return d;
          }, {
            a: 0,
            b: 0,
          })
          return total.b;
        }),
        backgroundColor: ["#0088FF"]
      },
    ],
  }
  return (
    <>
      <div className="report-content_data-option">
        <span className='position-span mg-60'>{shape}</span>
        <Select cl="shape" list={<List items={shapes} typeSelect='shape' />} />
      </div>
      <div className="report-content_data-chart">
        {time === "Ngày" && shape === "Biểu đồ cột" && <BarChart chartData={chartData} />}
        {time === "Ngày" && shape === " Biểu đồ đường" && <LineChart chartData={chartData} />}
        {time === "Tháng" && shape === "Biểu đồ cột" && <BarChart chartData={chartDataMonth} />}
        {time === "Tháng" && shape === " Biểu đồ đường" && <LineChart chartData={chartDataMonth} />}
        {time === "Năm" && shape === "Biểu đồ cột" && <BarChart chartData={chartDataYear} />}
        {time === "Năm" && shape === " Biểu đồ đường" && <LineChart chartData={chartDataYear} />}


      </div>
      <div className="horizontal">
      </div>
      <div className="report-content_data-table">
        <div className="report-column ">
          <h5>{time}</h5>
          <h5>Sô lượng đơn hàng</h5>
          <h5>Doanh thu</h5>
         

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
        <button className='btn export-btn' onClick={handleClick}>
          <svg className="MuiSvgIcon-root" style={{ width: '10px' }} focusable="false" viewBox="0 0 14 20" aria-hidden="true"><path d="M6 8.74228e-08L6 12.17L2.41 8.59L1 10L7 16L13 10L11.59 8.59L8 12.17L8 0L6 8.74228e-08Z" fill="currentColor"></path><path d="M0 18H14V20H0V18Z" fill="currentColor"></path></svg>
          Xuất ra file excel</button>

      </div>
      <SingleModal
        open={openExportExcelModal}
        setOpen={setOpenExportExcelModal}
        title="Xác nhận xuất file Excel"
        onConfirm={exportBillListExcel}
      ></SingleModal>
    </>
  )
}

export default ReportForTime