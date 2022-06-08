import { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import moment from "moment";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import SingleModal from "../../../component/modal/singlemodal/SingleModal";
import ReactNumberTextFormat from "../../../component/numberformat/template/ReactNumberTextFormat";

import CustomerService from "../../../api/CustomerService";
import AuthService from "../../../api/AuthService";

import "./CustomerListPage.css";

const ITEM_PER_PAGE = 10;

function CustomerListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [openExportExcelModal, setOpenExportExcelModal] = useState(false);

  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    CustomerService.searchCustomer({ query: query, page: 0, size: ITEM_PER_PAGE })
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  }, [query]);

  useEffect(() => {
    CustomerService.count(query)
      .then((res) => setTotalItem(res.data?.count))
      .catch((err) => console.log(err));
  }, [query, totalItem]);

  const handlePaginationChange = (event, page) => {
    setPage(page);

    CustomerService.searchCustomer({
      query: query,
      page: page - 1,
      size: ITEM_PER_PAGE,
    })
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  };

  return (
    <div className="customer-list">
      <div className="customer-header">
        <h2>Danh sách khách hàng</h2>
        <div className="customer-header__right">
          <p>Xin chào "{user.name}"</p>
          <Link to={match.path} onClick={() => AuthService.logout()}>
            Logout
          </Link>
        </div>
      </div>
      <div className="customer-option">
        <button
          className="btn-create"
          onClick={() => history.push(`${match.path}/create`)}
        >
          Tạo khách hàng
        </button>
      </div>
      <div className="customer-list-content">
        <div className="customer-list-filter">
          <div className="customer-searchbar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng, địa chỉ , ..."
              onKeyPress={(e) => {
                if (e.key === "Enter") setQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Mã khách hàng</th>
                <th>Tên  </th>
                <th>Nhóm khách hàng</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Người tạo</th>
                
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
          
                return (
                  <tr
                    key={customer.id}
                    onClick={() => history.push(`${match.path}/${customer.id}`)}
                  >
                    <td>{customer.code}</td>
                    <td>{customer.name}</td>
                    <td>{customer.groupCustomer}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.createdBy}</td>
                   
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

export default CustomerListPage;
