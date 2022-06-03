import { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";

import BillService from "../../../api/BillService";
import AuthService from "../../../api/AuthService";

import "./BillListPage.css";

const ITEM_PER_PAGE = 10;

function BillListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [bills, setBills] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    BillService.searchBill({ query: query, page: 0, size: ITEM_PER_PAGE })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    BillService.count()
      .then((res) => setTotalItem(res.data))
      .catch((err) => console.log(err));
  }, [totalItem]);

  const handlePaginationChange = (event, page) => {
    setPage(page);

    BillService.searchBill({
      query: query,
      page: page - 1,
      size: ITEM_PER_PAGE,
    })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  const searchBill = (e) => {
    e.preventDefault();

    BillService.searchBill({ query: query, page: 0, size: ITEM_PER_PAGE })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bill-list">
      <div className="bill-header">
        <h2>Phiếu thu</h2>
        <div className="bill-header__right">
          <p>Xin chào "{user.name}"</p>
          <Link to={match.path} onClick={() => AuthService.logout()}>
            Logout
          </Link>
        </div>
      </div>
      <div className="bill-option">
        <div className="option-excel">
          <div className="export-excel">
            <FileDownloadIcon />
            <span>Xuất file</span>
          </div>
        </div>
        <button
          className="btn-create"
          onClick={() => history.push(`${match.path}/create`)}
        >
          Tạo phiếu thu
        </button>
      </div>
      <div className="bill-list-content">
        <div className="bill-list-filter">
          <div className="bill-searchbar">
            <SearchIcon />
            <form onSubmit={searchBill}>
              <input
                type="text"
                placeholder="Tìm theo..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") setQuery(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
        <div>
          <table className="bill-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Loại phiếu</th>
                <th>Hình thức thanh toán</th>
                <th>Người tạo</th>
                <th>Số tiền thu</th>
                <th>Ngày ghi nhận</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  onClick={() => history.push(`${match.path}/${bill.id}`)}
                >
                  <td>{bill.code}</td>
                  <td>{bill.billCategory.name}</td>
                  <td>{bill.payment}</td>
                  <td>{bill.createdBy}</td>
                  <td>{bill.totalValue}</td>
                  <td>{bill.createdAt}</td>
                </tr>
              ))}
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
    </div>
  );
}

export default BillListPage;
