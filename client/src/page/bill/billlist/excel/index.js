import Excel from "exceljs";
import { saveAs } from "file-saver";

const EXCEL_FILE_NAME = "test"

const billListColumns = [
  { header: "Mã phiếu", key: "code" },
  { header: "Khách hàng", key: "customerName" },
  { header: "Loại phiếu", key: "billCategoryName" },
  { header: "Hình thức thanh toán", key: "payment" },
  { header: "Số tiền thu", key: "totalValue" },
  { header: "Ngày tạo", key: "createdAt" },
  { header: "Người tạo", key: "createdBy" },
  { header: "Ngày sửa", key: "modifiedAt" },
  { header: "Người sửa", key: "modifiedBy" },
]

export const exportBillList = (data) => {
  const workbook = new Excel.Workbook();

  const workSheetName = "Danh sách phiếu thu";
  const worksheet = workbook.addWorksheet(workSheetName);
  worksheet.columns = billListColumns;
  worksheet.addRows(data);

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, EXCEL_FILE_NAME);
    });
}
