import Excel from "exceljs";
import { saveAs } from "file-saver";

const EXCEL_FILE_NAME = "test"

const reportForBillCategoryColumn = [
  { header: "Loại phiếu thu", key: "name" },
  { header: "Mã phiếu thu", key: "code" },
  { header: "Số lượng phiếu thu sử dụng loại phiếu thu ", key: "count" },
  { header: "Mô tả", key: "description" },
 
]
const reportForCustomerColumn = [
    { header: "Tên khách hàng", key: "name" },
    { header: "Số lượng đơn hàng", key: "count" },
    { header: "Doanh thu ", key: "total" },
    { header: "Email", key: "email" },
    { header: "Số điên thoại", key: "phoneNumber" }
   
  ]
  const reportForAccountant  = [
    { header: "Tên ", key: "name" },
    { header: "Số phiếu thu đã tạo", key: "count" },
    { header: "Doanh thu ", key: "total" },
    { header: "Chi phí", key: "cost" },
    { header: "Lợi nhuận", key: "profit" }
   
  ]
  


export const exports = (data,type) => {
  const workbook = new Excel.Workbook();

  const workSheetName = `Báo cáo theo ${type}`;
  const worksheet = workbook.addWorksheet(workSheetName);
  worksheet.columns = (type === "Theo khách hàng" && reportForCustomerColumn ) ||
                      (type === "Theo loại phiếu thu" && reportForBillCategoryColumn ) ||
                      (type === "Theo nhân viên kế toán" && reportForAccountant ) ;
                      
  worksheet.addRows(data);

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, EXCEL_FILE_NAME);
    });
}
