<<<<<<< HEAD
function BillListPage() {
  return <div>Bill List Page</div>;
}

export default BillListPage;
=======
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import "./BillListPage.css";
import { useEffect, useState } from "react";
import BillService from "../../../api/BillService";

const itemPerPage = 10;

function BillListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [bills, setBills] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  let totalPage =
    totalItem % itemPerPage === 0
      ? totalItem / itemPerPage
      : Math.floor(totalItem / itemPerPage) + 1;

  useEffect(() => {
    BillService.searchBill({ query: query, page: 0, size: itemPerPage })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    BillService.count()
      .then((res) => setTotalItem(res.data))
      .catch((err) => console.log(err));
  }, [totalItem]);

  const handlePaginationChange = (page) => {
    setPage(page);

    BillService.searchBill({ query: query, page: page - 1, size: itemPerPage })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  const searchBill = (e) => {
    e.preventDefault();

    BillService.searchBill({ query: query, page: 0, size: itemPerPage })
      .then((res) => setBills(res.data?.bills))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bill-list">
      <div className="bill-header">
        <h2>Phiếu thu</h2>
        <div className="bill-header__right">
          <p>Xin chào {user.name} </p>
          <Link to={match.path}>Logout</Link>
        </div>
      </div>
      <div className="bill-option">
        <div className="option-excel">
          <FileDownloadIcon />
          <span>Xuất file</span>
          <FileUploadIcon />
          <span>Nhập file</span>
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
        <div className="content__table">
          <table>
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Loại phiếu</th>
                <th>Hình thức thanh toán</th>
                <th>Trạng thái</th>
                <th>Người tạo</th>
                <th>Số tiền thu</th>
                <th>Ngày ghi nhận</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.code}</td>
                  <td>{bill.billCategory.name}</td>
                  <td>{bill.payment}</td>
                  <td>{bill.created_by}</td>
                  <td>{bill.totalValue}</td>
                  <td>{bill.created_at}</td>
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
>>>>>>> 2a96b1098f9fc006b0fd9893e014a9d545caf4b4
