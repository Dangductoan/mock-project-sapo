import React from 'react'
import {useSelect} from '../../../context/Provider'
import Select from '../../../component/controller/selectInput/Select'
import List from '../../../component/controller/selectInput/List'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import RowBillCategoryReport from '../../../component/row/RowBillCategoryReport'
import BarChart from '../../../component/chart/BarChart'
import LineChart from '../../../component/chart/LineChart'
import {exports} from '../excel/ReportExcelType'
function ReportForBillCategory() {
    const cd = useSelect()
    const type = cd.data.type
    const shape = cd.data.shape
    const shapes = [" Biểu đồ đường", "Biểu đồ cột"]
    const data = ReportController.GetBillBetween()
    const bills = data !== undefined && GroupData.GroupDataForBillCategoryId(data.bills)
    // console.log(bills)
    const newData = Object.keys(bills).map((key) => {
        return {
            name:bills[key][0].billCategory.name,
            code:bills[key][0].billCategory.code,
            count:bills[key].length,
            description:bills[key][0].billCategory.description,
            
        }
    })
    const handleClick = () => {
        exports(newData,type)
    }
    // console.log(newData)
    const chartBillCategory = {
        labels: Object.keys(bills).map((key) => bills[key][0].billCategory.name),
        datasets: [
            {
                label: "Số đơn hàng sử dụng loại phiếu thu",
                data:  Object.keys(bills).map((key) => bills[key].length),
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

                {shape === "Biểu đồ cột" ? <BarChart chartData={chartBillCategory} />
                    : <LineChart chartData={chartBillCategory} />}

            </div>
            <div className="horizontal"></div>
            <div className="report-content_data-table" style={{textAlign:'center'}}>
                <div className="report-column columns">
                    <h5>Loại phiếu thu  </h5>
                    <h5>Mã phiếu thu </h5>
                    <h5>Số lượng phiếu thu sử dụng loại phiếu thu </h5>
                    <h5>Mô tả</h5>

                </div>
                {Object.keys(bills).map((key, i) => {
                    return (
                        <RowBillCategoryReport key={i} k={key} value={bills[key]} />
                    )
                })}
                <button className='btn' style={{margin:"40px 60px 40px 0",}} onClick={handleClick}>
            <svg className="MuiSvgIcon-root"  style={{width:'10px'}} focusable="false" viewBox="0 0 14 20" aria-hidden="true"><path d="M6 8.74228e-08L6 12.17L2.41 8.59L1 10L7 16L13 10L11.59 8.59L8 12.17L8 0L6 8.74228e-08Z" fill="currentColor"></path><path d="M0 18H14V20H0V18Z" fill="currentColor"></path></svg>
              Xuất ra file excel</button>
            </div>
        </>
    )
}

export default ReportForBillCategory