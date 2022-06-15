import React, { useState } from 'react'
import { useSelect } from '../../../context/Provider'
import ReportController from '../../../component/reportcontroller/ReportController'
import GroupData from '../../../component/groupdata/GroupData'
import RowBillCategoryReport from '../../../component/row/RowBillCategoryReport'
import BarChart from '../../../component/chart/BarChart'
import { exports } from '../excel/ReportExcelType'
import SingleModal from '../../../component/modal/singlemodal/SingleModal'

function ReportForBillCategory() {
    const cd = useSelect()
    const type = cd.data.type
    const [openExportExcelModal, setOpenExportExcelModal] = useState(false);

    const data = ReportController.GetBillBetween()
    const bills = data !== undefined && GroupData.GroupDataForBillCategoryId(data.bills)
    // console.log(bills)
    const newData = Object.keys(bills).map((key) => {
        return {
            name: bills[key][0].billCategory.name,
            code: bills[key][0].billCategory.code,
            count: bills[key].length,
            description: bills[key][0].billCategory.description,

        }
    })
    const exportBillListExcel = () => {

        exports(newData, type)
        setOpenExportExcelModal(false);

    };
    const handleClick = () => {
        setOpenExportExcelModal(true)
    }
    // console.log(newData)
    const chartBillCategory = {
        labels: Object.keys(bills).map((key) => bills[key][0].billCategory.name),
        datasets: [
            {
                label: "Số đơn hàng sử dụng loại phiếu thu",
                data: Object.keys(bills).map((key) => bills[key].length),
                backgroundColor: ["#0088FF"]
            },
        ],
    }
    return (
        <>
            <div className="report-content_data-option">

            </div>
            <div className="report-content_data-chart">

                <BarChart chartData={chartBillCategory} />


            </div>
            <div className="horizontal"></div>
            <div className="report-content_data-table" style={{ textAlign: 'center' }}>
                <div className="report-column ">
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

export default ReportForBillCategory