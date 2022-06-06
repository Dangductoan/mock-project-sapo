import React from 'react'
import Select from '../../../component/controller/selectInput/Select'
import List from '../../../component/controller/selectInput/List'
import { useSelect } from '../../../context/Provider'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import RowCustomerReport from '../../../component/row/RowCustomerReport'
import BarChart from '../../../component/chart/BarChart'
import LineChart from '../../../component/chart/LineChart'
function ReportForCustomer() {
    const cd = useSelect()
    const shape = cd.data.shape
    const shapes = [" Biểu đồ đường", "Biểu đồ cột"]
    const data = ReportController.GetBillBetween()
    const bills = data !== undefined && GroupData.GroupDataForCustomerId(data.bills)
    const chartCustomer = {
        labels: Object.keys(bills).map((key) => bills[key][0].customer.name),
        datasets: [
            {
                label: "Doanh thu theo khách hàng",
                data: Object.keys(bills).map((key) => {
                    const total = bills[key] !== undefined && bills[key].reduce((d, v) => {
                        d.b = d.b + v.totalValue;
                        return d;
                    }, {
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

                {shape === "Biểu đồ cột" ? <BarChart chartData={chartCustomer} />
                    : <LineChart chartData={chartCustomer} />}

            </div>
            <div className="horizontal"></div>
            <div className="report-content_data-table">
                <div className="report-column columns">
                    <h5>Tên khách hàng </h5>
                    <h5>Sô lượng đơn hàng</h5>
                    <h5>Doanh thu</h5>
                    <h5>Email</h5>
                    <h5>Số điện thoại</h5>

                </div>
                {Object.keys(bills).map((key, i) => {
                    return (
                        <RowCustomerReport key={i} k={key} value={bills[key]} />
                    )
                })}
            </div>
        </>
    )
}

export default ReportForCustomer