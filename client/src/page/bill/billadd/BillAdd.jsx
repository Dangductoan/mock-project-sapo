import {
  faAngleLeft,
  faArrowsRotate,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import BillCategoryService from "../../../api/BillCategoryService";
import BillService from "../../../api/BillService";
import CustomerService from "../../../api/CustomerService";
import DropDownHasSearch from "../../../component/dropdown/DropDownHasSearch";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import { randomCode } from "../../../utils/StringRandom";
import { validateBillCreate } from "../../../validation/bill";
import "./BillAdd.css";
import CustomerAddModal from "./customeradd/CustomerAddModal";

export default function BillAdd() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const match = useRouteMatch();

  const bill = useFormik({
    initialValues: {
      customerName: "",
      billCategoryName: "",
      code: randomCode(10),
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
    CustomerService.searchCustomer({ page: 0, size: 10 })
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  }, []);

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  const handleCustomersChange = (customer) => {
    CustomerService.searchCustomer({})
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
    bill.setFieldValue("customerName", customer.name);
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
        <span>Phi???u thu</span>
      </span>
      <div className="bill-heading">
        <h2>Th??m m???i phi???u thu</h2>
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
      <form onSubmit={bill.handleSubmit}>
        <div className="bill-content">
          <div className="bill-info">
            <h3 className="bill-info-heading">Th??ng tin chung</h3>
            <div>
              <div>
                <p>
                  T??n kh??ch h??ng <span className="required-asterisk">*</span>
                </p>
                <DropDownHasSearch
                  data={customers.map((customer) => customer.name)}
                  onChange={(customerName) =>
                    bill.setFieldValue("customerName", customerName)
                  }
                  onSearch={(query) => {
                    CustomerService.searchCustomer({
                      query: query,
                      page: 0,
                      size: 10,
                    })
                      .then((res) => setCustomers(res.data?.customers))
                      .catch((err) => console.log(err));
                  }}
                  title="Ch???n t??n kh??ch h??ng"
                  hasSearch={true}
                  className="bill-input"
                  name="customerName"
                  // onBlur={bill.handleBlur}
                  value={bill.values.customerName}
                />
                {bill.touched.customerName && bill.errors.customerName && (
                  <div className="text-danger">{bill.errors.customerName}</div>
                )}
              </div>
              <div>
                <p>
                  Lo???i phi???u thu <span className="required-asterisk">*</span>
                </p>
                <select
                  className="bill-input"
                  name="billCategoryName"
                  onBlur={bill.handleBlur}
                  onChange={bill.handleChange}
                >
                  <option value="">Ch???n lo???i phi???u thu</option>
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
                <p>
                  M?? phi???u <span className="required-asterisk">*</span>
                </p>
                <span className="bill-input">
                  <input
                    className="input-hidden"
                    name="code"
                    onBlur={bill.handleBlur}
                    onChange={bill.handleChange}
                    value={bill.values.code}
                  />
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    onClick={() => {
                      bill.setFieldValue("code", randomCode(10));
                    }}
                    title="T??? ?????ng t???o"
                  />
                </span>
                {bill.touched.code && bill.errors.code && (
                  <div className="text-danger">{bill.errors.code}</div>
                )}
              </div>
              <div>
                <p>
                  Gi?? tr??? <span className="required-asterisk">*</span>
                </p>
                <NumberFormat
                  className="bill-input"
                  name="totalValue"
                  onChange={bill.handleChange}
                  onBlur={bill.handleBlur}
                  thousandsGroupStyle="thousand"
                  decimalSeparator="."
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
                {bill.touched.totalValue && bill.errors.totalValue && (
                  <div className="text-danger">{bill.errors.totalValue}</div>
                )}
              </div>
              <div>
                <p>
                  H??nh th???c thanh to??n{" "}
                  <span className="required-asterisk">*</span>
                </p>
                <select
                  className="bill-input"
                  name="payment"
                  onChange={bill.handleChange}
                  onBlur={bill.handleBlur}
                >
                  <option value="">Ch???n h??nh th???c thanh to??n</option>
                  <option value="Ti???n m???t">Ti???n m???t</option>
                  <option value="Qu???t th???">Qu???t th???</option>
                  <option value="Chuy???n kho???n">Chuy???n kho???n</option>
                </select>
                {bill.touched.payment && bill.errors.payment && (
                  <div className="text-danger">{bill.errors.payment}</div>
                )}
              </div>
            </div>
          </div>
          <div className="bill-description">
            <h3 className="bill-info-heading">M?? t???</h3>
            <div>
              <textarea
                className="bill-input"
                type="text"
                name="description"
                onChange={bill.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="bill-add-submit">
          <button
            type="button"
            className="btn-cancle"
            onClick={() =>
              history.push(
                `${match.path.substring(0, match.path.lastIndexOf("/"))}`
              )
            }
          >
            H???y
          </button>
          <button className="btn-create" type="submit">
            Th??m
          </button>
        </div>
      </form>
      <CustomerAddModal
        open={customerAddModalOpen}
        setOpen={setCustomerAddModalOpen}
        onCustomerChange={handleCustomersChange}
      />
      <ToastifyToast />
    </div>
  );
}
