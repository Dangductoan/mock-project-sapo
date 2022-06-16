import Excel from "exceljs";
import { saveAs } from "file-saver";

const EXCEL_FILE_NAME = "test"

const reportForDateColumn = [
  { header: "Ngày", key: "date" },
  { header: "Số lượng đơn hàng", key: "billQuantity" },
  { header: "Doanh thu ", key: "totalRevenue" },

]
const reportForMonthColumn = [
  { header: "Tháng", key: "date" },
  { header: "Số lượng đơn hàng", key: "billQuantity" },
  { header: "Doanh thu ", key: "totalRevenue" },

]
const reportForYearColumn = [
  { header: "Năm", key: "date" },
  { header: "Số lượng đơn hàng", key: "billQuantity" },
  { header: "Doanh thu ", key: "totalRevenue" },


]

export const exports = (data, time) => {
  const workbook = new Excel.Workbook();

  const workSheetName = `Báo cáo theo ${time}`;
  const worksheet = workbook.addWorksheet(workSheetName);
  worksheet.columns = (time === "Ngày" && reportForDateColumn) ||
    (time === "Tháng" && reportForMonthColumn) ||
    (time === "Năm" && reportForYearColumn);
  worksheet.addRows(data);

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, EXCEL_FILE_NAME);
    });
}
