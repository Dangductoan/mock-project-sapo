import { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import CustomerService from "../../../api/CustomerService";
import AuthService from "../../../api/AuthService";
import CustomerAddModal from "../../bill/billadd/customeradd/CustomerAddModal";
import "./CustomerListPage.css";
import { faAngleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEM_PER_PAGE = 10;

function CustomerListPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const match = useRouteMatch();
  const history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [customerAddModalOpen, setCustomerAddModalOpen] = useState(false);
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
  const handleCustomerAdd = () => {
    CustomerService.searchCustomer({})
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
          className="btn-create btn__icon"
          onClick={() => {
            setCustomerAddModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Thêm mới khách hàng
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
        <CustomerAddModal
        open={customerAddModalOpen}
        setOpen={setCustomerAddModalOpen}
        onCustomerChange={handleCustomerAdd}
      />
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
