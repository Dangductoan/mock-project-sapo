import Excel from "exceljs";
import { saveAs } from "file-saver";

const EXCEL_FILE_NAME = "test"

const billListColumns = [
  { key: "code" },
  { key: "customerName" },
  { key: "billCategoryName" },
  { key: "payment" },
  { key: "totalValue" },
  { key: "createdAt" },
  { key: "createdBy" },
  { key: "modifiedAt" },
  { key: "modifiedBy" },
]

export const exportBillList = (title, data) => {
  const workbook = new Excel.Workbook();

  const workSheetName = "Danh sách phiếu thu";
  const worksheet = workbook.addWorksheet(workSheetName);
  worksheet.columns = billListColumns;
  // worksheet.mergeCells("A1", "I1");
  // worksheet.mergeCells("A2", "I2");
  worksheet.getCell("A1").value = "DANH SÁCH PHIẾU THU";
  worksheet.getCell("A2").value = title;
  // worksheet.getCell("A1").alignment = { vertical: 'middle', horizontal: 'center' };
  // worksheet.getCell("A2").alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.getRow(4).values = ["Mã phiếu", "Khách hàng", "Loại phiếu", "Hình thức thanh toán", "Số tiền thu", "Ngày tạo", "Người tạo", "Ngày sửa", "Người sửa"];
  worksheet.addRows(data);

  // tạo độ rộng cột tự động
  worksheet.columns.forEach(function (column, i) {
    var maxLength = 0;
    if (i === 0) {
      column.width = 15;
    } else {
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    }
  });

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, EXCEL_FILE_NAME);
    });
}
