import React, { useState } from 'react'
import { useSelect } from '../../../context/Provider'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import RowCustomerReport from '../../../component/row/RowCustomerReport'
import BarChart from '../../../component/chart/BarChart'
import { exports } from '../excel/ReportExcelType'
import SingleModal from '../../../component/modal/singlemodal/SingleModal'

function ReportForCustomer() {
    const cd = useSelect()
    const type = cd.data.type
    const [openExportExcelModal, setOpenExportExcelModal] = useState(false);

    const data = ReportController.GetBillBetween()
    const bills = data !== undefined && GroupData.GroupDataForCustomerId(data.bills)
    const billsCharts = bills === undefined ? {} : { 0: [{ totalValue: 0, customer: { name: '' } }], ...bills };
    const newData = Object.keys(bills).map((key) => {
        const result = bills[key] !== undefined && bills[key].reduce((d, v) => {
            d.total = d.total + v.totalValue;
            return d;
        }, {
            name: bills[key][0].customer.name,
            count: bills[key].length,
            total: 0,
            email: bills[key][0].customer.email,
            phoneNumber: bills[key][0].customer.phoneNumber
        })
        return result

    })
    const exportBillListExcel = () => {

        exports(newData, type)
        setOpenExportExcelModal(false);

    };
    const handleClick = () => {
        setOpenExportExcelModal(true)
    }
    // console.log(newData)
    const chartCustomer = {
        labels: Object.keys(billsCharts).map((key) => billsCharts[key][0].customer.name),
        datasets: [
            {
                label: "Doanh thu theo khách hàng",
                data: Object.keys(billsCharts).map((key) => {
                    const total = billsCharts[key] !== undefined && billsCharts[key].reduce((d, v) => {
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
                {/* <span className='position-span mg-60'>{shape}</span>
                <Select cl="shape" list={<List items={shapes} typeSelect='shape' />} /> */}
            </div>
            <div className="report-content_data-chart">

                <BarChart chartData={chartCustomer} />


            </div>
            <div className="horizontal"></div>
            <div className="report-content_data-table" style={{ textAlign: 'center' }}>
                <div className="report-column ">
                    <h5>Tên khách hàng </h5>
                    <h5>Email</h5>
                    <h5>Số điện thoại</h5>
                    <h5>Sô lượng đơn hàng</h5>
                    <h5>Doanh thu</h5>

                </div>
                {Object.keys(bills).map((key, i) => {
                    return (
                        <RowCustomerReport key={i} k={key} value={bills[key]} />
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

export default ReportForCustomer