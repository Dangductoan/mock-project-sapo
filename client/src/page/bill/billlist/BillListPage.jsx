import {
  faDownload,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import BillService from "../../../api/BillService";
import SingleModal from "../../../component/modal/singlemodal/SingleModal";
import ReactNumberTextFormat from "../../../component/numberformat/template/ReactNumberTextFormat";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import CircularIndeterminate from "../../../component/progress/CircularProgress";
import "./BillListPage.css";
import { exportBillList } from "./excel";
import Filter from "../../../component/filter/Filter";
const ITEM_PER_PAGE = 20;

function BillListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [bills, setBills] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: "",
    customerId: null,
    billCategoryId: null,
    page: 0,
    size: ITEM_PER_PAGE,
    payment: "",
    start: "",
    end: "",
    createdBy: "",
  });
  const [fileExcelExportType, setFileExcelExportType] =
    useState("current-page");

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    BillService.searchBill(searchParams)
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
    BillService.count(searchParams)
      .then((res) => setTotalItem(res.data?.count))
      .catch((err) => console.log(err));
  }, [
    searchParams.billCategoryId,
    searchParams.createdBy,
    searchParams.customerId,
    searchParams.end,
    searchParams.page,
    searchParams.payment,
    searchParams.query,
    searchParams.start,
  ]);

  const handlePaginationChange = (event, page) => {
    setSearchParams({ ...searchParams, page: page - 1 });

    BillService.searchBill(searchParams)
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  const handleExportBillListExcel = () => {
    document
      .getElementById("circular-progress")
      .classList.toggle("circular-progress-show");

    if (fileExcelExportType === "current-page") {
      mapDataAndExport(bills);
    } else if (fileExcelExportType === "all") {
      BillService.searchBill({
        query: searchParams.query,
        customerId: searchParams.customerId,
        billCategoryId: searchParams.billCategoryId,
        payment: searchParams.payment,
        start: searchParams.start,
        end: searchParams.end,
        createdBy: searchParams.createdBy,
      })
        .then((res) => {
          mapDataAndExport(res.data?.bills);
        })
        .catch((err) => console.log(err));
    }
    setTimeout(() => {
      document
        .getElementById("circular-progress")
        .classList.toggle("circular-progress-show");
    }, 500);
  };

  const mapDataAndExport = (data) => {
    data = data.map((bill) => ({
      ...bill,
      customerName: bill.customer.name,
      billCategoryName: bill.billCategory.name,
      createdAt: moment(bill.createdAt).format("DD/MM/YYYY HH:mm"),
      modifiedAt: moment(bill.modifiedAt).format("DD/MM/YYYY HH:mm"),
    }));
    exportBillList(data);
    setOpenExportExcelModal(false);
  };

  return (
    <div className="bill-list">
      <div className="bill-header">
        <h2>Phiếu thu</h2>
        <div className="bill-header__right">
          <p>Xin chào "{user.name}"</p>
        </div>
      </div>
      <div className="bill-option">
        <div className="option-excel">
          <div
            className="export-excel"
            onClick={() => setOpenExportExcelModal(true)}
          >
            <FontAwesomeIcon icon={faDownload} className="svg-khutx" />
            <span>Xuất file</span>
          </div>
        </div>
        <button
          className="btn-create btn__icon"
          onClick={() => history.push(`${match.path}/create`)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Tạo phiếu thu
        </button>
      </div>
      <div className="bill-list-content">
        <div className="bill-list-filter">
          <Filter  searchParams={searchParams} setSearchParams={setSearchParams}  />
          <div className="bill-searchbar searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="Tìm theo mã phiếu, tên khách hàng, loại phiếu, hình thức thanh toán và người tạo"
              onKeyPress={(e) => {
                if (e.key === "Enter")
                  setSearchParams({
                    ...searchParams,
                    page: 0,
                    query: e.target.value,
                  });
              }}
            />
          </div>
        </div>
        <div>
          <table className="bill-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Khách hàng</th>
                <th>Loại phiếu</th>
                <th>Hình thức thanh toán</th>
                <th>Người tạo</th>
                <th className="table__price">Số tiền thu</th>
                <th className="table__price">Ngày ghi nhận</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => {
                return (
                  <tr
                    key={bill.id}
                    onClick={() => history.push(`${match.path}/${bill.id}`)}
                  >
                    <td>{bill.code}</td>
                    <td>{bill.customer.name}</td>
                    <td>{bill.billCategory.name}</td>
                    <td>{bill.payment}</td>
                    <td>{bill.createdBy}</td>
                    <td className="table__price">
                      <ReactNumberTextFormat value={bill.totalValue} />
                    </td>
                    <td className="table__price">
                      {moment(bill.createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <MaterialPagination
            count={totalPage}
            page={searchParams.page + 1}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
      <SingleModal
        open={openExportExcelModal}
        setOpen={setOpenExportExcelModal}
        title="Xác nhận xuất file Excel"
        onConfirm={handleExportBillListExcel}
        className="bill-export"
      >
        <div className="bill-export--chosen">
          <legend>Chọn loại file:</legend>
          <div>
            <input
              type="radio"
              id="current-page"
              name="drone"
              value="current-page"
              defaultChecked
              onChange={(e) => setFileExcelExportType(e.target.value)}
            />
            <label for="current-page">Xuất phiếu thu ở trạng hiện tại</label>
          </div>
          <div>
            <input
              type="radio"
              id="all"
              name="drone"
              value="all"
              onChange={(e) => setFileExcelExportType(e.target.value)}
            />
            <label for="all">
              Xuất toàn bộ phiếu thu đã lọc(tìm kiếm) được
            </label>
          </div>
        </div>
      </SingleModal>
      <CircularIndeterminate />
    </div>
  );
}

export default BillListPage;
