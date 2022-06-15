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
import "./BillListPage.css";
import { exportBillList } from "./excel";

const ITEM_PER_PAGE = 20;

function BillListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [bills, setBills] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    BillService.searchBill({
      query: query,
      page: 0,
      size: ITEM_PER_PAGE,
      sort: "createdAt,desc",
    })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    BillService.count(query)
      .then((res) => setTotalItem(res.data?.count))
      .catch((err) => console.log(err));
  }, [query, totalItem]);

  const handlePaginationChange = (event, page) => {
    setPage(page);

    BillService.searchBill({
      query: query,
      page: page - 1,
      size: ITEM_PER_PAGE,
      sort: "createdAt,desc",
    })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  const exportBillListExcel = () => {
    let data = bills.map((bill) => ({
      ...bill,
      customerName: bill.customer.name,
      billCategoryName: bill.billCategory.name,
      createdAt: moment(bill.createdAt).format("DD/MM/YYYY hh:mm"),
      modifiedAt: moment(bill.modifiedAt).format("DD/MM/YYYY hh:mm"),
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
          <div className="bill-searchbar searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="Tìm theo mã phiếu, tên khách hàng, loại phiếu, hình thức thanh toán và người tạo"
              onKeyPress={(e) => {
                if (e.key === "Enter") setQuery(e.target.value);
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
                      {moment(bill.createdAt).format("DD/MM/YYYY hh:mm")}
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
            page={page}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
      <SingleModal
        open={openExportExcelModal}
        setOpen={setOpenExportExcelModal}
        title="Xác nhận xuất file Excel"
        onConfirm={exportBillListExcel}
      ></SingleModal>
    </div>
  );
}

export default BillListPage;
