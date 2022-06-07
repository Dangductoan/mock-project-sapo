import { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import AccountantService from "../../../api/AccountantService";
import AuthService from "../../../api/AuthService";
import "./AccountantListPage.css";

const ITEM_PER_PAGE = 10;

function AccountantListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [accountants, setAccountants] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    AccountantService.searchAccountant({ query: query, page: 0, size: ITEM_PER_PAGE })
      .then((res) => setAccountants(res.data?.users))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    AccountantService.count(query)
      .then((res) => setTotalItem(res.data?.count))
      .catch((err) => console.log(err));
  }, [query, totalItem]);

  const handlePaginationChange = (event, page) => {
    setPage(page);

    AccountantService.searchAccountant({
      query: query,
      page: page - 1,
      size: ITEM_PER_PAGE,
    })
      .then((res) => setAccountants(res.data?.accountants))
      .catch((err) => console.log(err));
  };


  return (
    <div className="accountant-list">
      <div className="accountant-header">
        <h2>Danh sách nhân viên</h2>
        <div className="accountant-header__right">
          <p>Xin chào "{user.name}"</p>
          <Link to={match.path} onClick={() => AuthService.logout()}>
            Logout
          </Link>
        </div>
      </div>
      <div className="accountant-option">
        <button
          className="btn-create"
          onClick={() => history.push(`${match.path}/create`)}
        >
          Thêm nhân viên
        </button>
      </div>
      <div className="accountant-list-content">
        <div className="accountant-list-filter">
          <div className="accountant-searchbar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm theo tên,số điện thoại,địa chỉ,...  "
              onKeyPress={(e) => {
                if (e.key === "Enter") setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <table className="accountant-table">
            <thead>
              <tr>
              <th>Tên nhân viên</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {accountants.map((accountant) => {
                return (
                  <tr
                    key={accountant.id}
                    onClick={() => history.push(`${match.path}/${accountant.id}`)}
                  >
                    <td>{accountant.name}</td>
                    <td>{accountant.phoneNumber}</td>
                    <td>{accountant.address}</td>
                    <td>{moment(accountant.createdAt).format("DD/MM/YYYY hh:mm")}</td>
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
    </div>
  );
}

export default AccountantListPage;
