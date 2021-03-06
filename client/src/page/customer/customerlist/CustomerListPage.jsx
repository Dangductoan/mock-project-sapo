import {
  faMagnifyingGlass,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import CustomerService from "../../../api/CustomerService";
import MaterialPagination from "../../../component/pagination/template/MaterialPagination";
import CustomerAddModal from "../../bill/billadd/customeradd/CustomerAddModal";
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
  const [customerAddModalOpen, setCustomerAddModalOpen] = useState(false);
  let totalPage =
    totalItem % ITEM_PER_PAGE === 0
      ? totalItem / ITEM_PER_PAGE
      : Math.floor(totalItem / ITEM_PER_PAGE) + 1;

  useEffect(() => {
    CustomerService.searchCustomer({
      query: query,
      page: 0,
      size: ITEM_PER_PAGE,
    })
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
        <h2>Danh s??ch kh??ch h??ng</h2>
        <div className="customer-header__right">
          <p>Xin ch??o "{user.name}"</p>
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
          Th??m m???i kh??ch h??ng
        </button>
      </div>
      <div className="customer-list-content">
        <div className="customer-list-filter">
          <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
            <input
              type="text"
              placeholder="T??m theo t??n kh??ch h??ng, ?????a ch??? , ..."
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
                <th>M?? kh??ch h??ng</th>
                <th>T??n </th>
                <th>Nh??m kh??ch h??ng</th>
                <th>?????a ch???</th>
                <th>S??? ??i???n tho???i</th>
                <th>Ng?????i t???o</th>
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
