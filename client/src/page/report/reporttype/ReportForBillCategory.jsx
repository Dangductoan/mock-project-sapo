import React from 'react'
import {useSelect} from '../../../context/Provider'
import Select from '../../../component/controller/selectInput/Select'
import List from '../../../component/controller/selectInput/List'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import RowBillCategoryReport from '../../../component/row/RowBillCategoryReport'
import BarChart from '../../../component/chart/BarChart'
import LineChart from '../../../component/chart/LineChart'

function ReportForBillCategory() {
    const cd = useSelect()
    const shape = cd.data.shape
    const shapes = [" Biểu đồ đường", "Biểu đồ cột"]
    const data = ReportController.GetBillBetween()
    const bills = data !== undefined && GroupData.GroupDataForBillCategoryId(data.bills)
    console.log(bills)
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
            <div className="report-content_data-table">
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
            </div>
        </>
    )
}

export default ReportForBillCategory