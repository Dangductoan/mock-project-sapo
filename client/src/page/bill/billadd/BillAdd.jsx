import { faAngleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import BillCategoryService from "../../../api/BillCategoryService";
import BillService from "../../../api/BillService";
import CustomerService from "../../../api/CustomerService";
import ReactNumberInputFormat from "../../../component/numberformat/template/ReactNumberInputFormat";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import { validateBillCreate } from "../../../validation/bill";
import "./BillAdd.css";
import CustomerAddModal from "./customeradd/CustomerAddModal";

export default function BillAdd() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const match = useRouteMatch();

  // const [bill, setBill] = useState({});
  const bill = useFormik({
    initialValues: {
      customerName: "",
      billCategoryName: "",
      code: "",
      totalValue: "",
      payment: "",
      description: "",
    },
    validationSchema: validateBillCreate,
    onSubmit: (bill) => {
      let billCategory = billCategories.find(
        ({ name }) => name === `${bill.billCategoryName}`
      );
      let customer = customers.find(
        ({ name }) => name === `${bill.customerName}`
      );
      if (!Number.isInteger(bill.totalValue))
        bill.totalValue = parseFloat(bill.totalValue.replace(/,/g, ""));
      BillService.createBill({
        ...bill,
        billCategory,
        customer,
        createdBy: user.name,
        modifidedBy: user.name,
      })
        .then((res) => {
          let path = match.path.substring(0, match.path.lastIndexOf("/"));
          history.push(`${path}/${res.data?.bill?.id}`, {
            showBillAddSuccess: true,
          });
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    },
  });
  const [billCategories, setBillCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
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

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  const handleCustomerAdd = () => {
    CustomerService.searchCustomer({})
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bill-add">
      <span
        className="bill-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "10px" }} />
        <span>Phiếu thu</span>
      </span>
      <div className="bill-heading">
        <h2>Thêm mới phiếu thu</h2>
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
      <form onSubmit={bill.handleSubmit}>
        <div className="bill-content">
          <div className="bill-info">
            <h3>Thông tin chung</h3>
            <div>
              <div>
                <p>Tên khách hàng *</p>
                <select
                  name="customerName"
                  onChange={bill.handleChange}
                  onBlur={bill.handleBlur}
                >
                  <option value="">Chọn tên khách hàng </option>
                  {customers.map((customer) => (
                    <option value={customer.name}>{customer.name}</option>
                  ))}
                </select>
                {bill.touched.customerName && bill.errors.customerName && (
                  <div className="text-danger">{bill.errors.customerName}</div>
                )}
              </div>
              <div>
                <p>Loại phiếu thu *</p>
                <select
                  name="billCategoryName"
                  onBlur={bill.handleBlur}
                  onChange={bill.handleChange}
                >
                  <option value="">Chọn loại phiếu thu</option>
                  {billCategories.map((billCategory) => (
                    <option value={billCategory.name}>
                      {billCategory.name}
                    </option>
                  ))}
                </select>
                {bill.touched.billCategoryName &&
                  bill.errors.billCategoryName && (
                    <div className="text-danger">
                      {bill.errors.billCategoryName}
                    </div>
                  )}
              </div>
              <div>
                <p>Mã phiếu *</p>
                <input
                  name="code"
                  onBlur={bill.handleBlur}
                  onChange={bill.handleChange}
                />
                {bill.touched.code && bill.errors.code && (
                  <div className="text-danger">{bill.errors.code}</div>
                )}
              </div>
              <div>
                <p>Giá trị *</p>
                <ReactNumberInputFormat
                  name="totalValue"
                  onChange={bill.handleChange}
                  onBlur={bill.handleBlur}
                />
                {bill.touched.totalValue && bill.errors.totalValue && (
                  <div className="text-danger">{bill.errors.totalValue}</div>
                )}
              </div>
              <div>
                <p>Hình thức thanh toán *</p>
                <select
                  name="payment"
                  onChange={bill.handleChange}
                  onBlur={bill.handleBlur}
                >
                  <option value="">Chọn hình thức thanh toán</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Quẹt thẻ">Quẹt thẻ</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                </select>
                {bill.touched.payment && bill.errors.payment && (
                  <div className="text-danger">{bill.errors.payment}</div>
                )}
              </div>
            </div>
          </div>
          <div className="bill-description">
            <h3>Mô tả</h3>
            <div>
              <textarea
                type="text"
                name="description"
                onChange={bill.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="bill-add-submit">
          <button
            className="btn-cancle"
            onClick={() =>
              history.push(
                `${match.path.substring(0, match.path.lastIndexOf("/"))}`
              )
            }
          >
            Hủy
          </button>
          <button className="btn-create" type="submit">
            Thêm
          </button>
        </div>
      </form>
      <CustomerAddModal
        open={customerAddModalOpen}
        setOpen={setCustomerAddModalOpen}
        onCustomerChange={handleCustomerAdd}
      />
      <ToastifyToast />
    </div>
  );
}
