import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import BillCategoryService from "../../../api/BillCategoryService";
import BillService from "../../../api/BillService";
import CustomerService from "../../../api/CustomerService";

import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import CustomerAddModal from "./customeradd/CustomerAddModal";

import "./BillAdd.css";

export default function BillAdd() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const [bill, setBill] = useState({
    billCategoryName: "",
    customerName: "",
  });
  const [billCategories, setBillCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  // const [error, setError] = useState({});
  const [customerAddModalOpen, setCustomerAddModalOpen] = useState(false);

  useEffect(() => {
    BillCategoryService.getBillCategory()
      .then((res) => {
        setBillCategories(res.data);
      })
      .catch((err) => console.log(err));
    CustomerService.searchCustomer({})
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  }, []);

  const addBill = () => {
    let billCategory = billCategories.find(
      ({ name }) => name === `${bill.billCategoryName}`
    );
    let customer = customers.find(
      ({ name }) => name === `${bill.customerName}`
    );
    BillService.createBill({
      ...bill,
      billCategory,
      customer,
      createdBy: user.name,
      modifidedBy: user.name,
    })
      .then((res) => {
        history.push(`/accountant/bills/${res.data?.bill?.id}`, {
          showBillAddSuccess: true,
        });
      })
      .catch(({ response }) => {
        showToast(response.data?.error?.message, "error");
      });
  };

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setBill({
      ...bill,
      [name]: value,
    });
  };

  const handleCustomerAdd = () => {
    CustomerService.searchCustomer({})
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bill-add">
      <div className="bill-heading">
        <h2>Thêm mới phiếu thu</h2>
        <button
          className="btn-create"
          onClick={() => {
            setCustomerAddModalOpen(true);
          }}
        >
          Thêm mới khách hàng
        </button>
      </div>
      <div className="bill-content">
        <div className="bill-info">
          <h3>Thông tin chung</h3>
          <div>
            <div>
              <p>Tên khách hàng *</p>
              <select name="customerName" id="" onChange={handleInputChange}>
                <option value="">Chọn tên khách hàng </option>
                {customers.map((customer) => (
                  <option value={customer.name}>{customer.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Loại phiếu thu *</p>
              <select
                name="billCategoryName"
                id=""
                onChange={handleInputChange}
              >
                <option value="">Chọn loại phiếu thu</option>
                {billCategories.map((billCategory) => (
                  <option value={billCategory.name}>{billCategory.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Mã phiếu</p>
              <input type="text" name="code" onChange={handleInputChange} />
            </div>
            <div>
              <p>Giá trị *</p>
              <input
                type="number"
                name="totalValue"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>Hình thức thanh toán</p>
              <select name="payment" id="" onChange={handleInputChange}>
                <option value="">--Please choose an option--</option>
                <option value="Tiền mặt">Tiền mặt</option>
                <option value="Quẹt thẻ">Quẹt thẻ</option>
                <option value="Chuyển khoản">Chuyển khoản</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bill-description">
          <h3>Mô tả</h3>
          <div>
            <textarea
              type="text"
              name="description"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="bill-add-submit">
        <button
          className="btn-cancle"
          onClick={() => history.push("/accountant/bills")}
        >
          Hủy
        </button>
        <button className="btn-create" onClick={addBill}>
          Thêm
        </button>
      </div>
      <CustomerAddModal
        open={customerAddModalOpen}
        setOpen={setCustomerAddModalOpen}
        onCustomerChange={handleCustomerAdd}
      />
      <ToastifyToast />
    </div>
  );
}
