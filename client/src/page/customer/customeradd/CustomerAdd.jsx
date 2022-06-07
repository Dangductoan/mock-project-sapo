import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomerService from "../../../api/CustomerService";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import { VIETNAM_PHONE_REGEX} from "../../../utils/regex";
import "./CustomerAdd.css";
export default function CustomerAdd() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const match = useRouteMatch();

  const customer = useFormik({
    initialValues: {
    
      name: "",
      phoneNumber: "",
      address: "",
      groupCustomer: "",
      email:""

    },
    validationSchema: validateCustomer,
    onSubmit: (customer) => {
      CustomerService.createCustomer({
        ...customer,
        createdBy:user.name,
        code:makeid()
        
      })
        .then((res) => {
          let path = match.path.substring(0, match.path.lastIndexOf("/"));
          history.push(`${path}/${res.data?.customer?.id}`, {
            showCustomerAddSuccess: true,
          });
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    },
  });
  const makeid=()=> {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };


  return (
    <div className="customer-add">
      <span
        className="customer-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <ArrowBackIosNewIcon style={{ width: "15px" }} />
        <span>Danh sách khách hàng</span>
      </span>
      <div className="customer-heading">
        <h2>Thêm mới khách hàng</h2>
      </div>
      <form onSubmit={customer.handleSubmit}>
        <div className="customer-content">
          <div className="customer-info">
            <h3>Thông tin chung</h3>
            <div>
              <div>
                <p>Tên *</p>
                <input
                  type="text"
                  name="name"
                  onBlur={customer.handleBlur}
                  onChange={customer.handleChange}
                />
                {customer.touched.name && customer.errors.name && (
                  <div className="text-danger">{customer.errors.name}</div>
                )}
              </div>
              <div>
                <p>Nhóm khách hàng *</p>
                <select
                  name="groupCustomer"
                  onBlur={customer.handleBlur}
                  onChange={customer.handleChange}
                >
                  <option value="">Chọn nhóm khách hàng</option>
                  <option value="Bán lẻ">Bán lẻ</option>
                  <option value="Bán buôn">Bán buôn</option>
                </select>
                {customer.touched.groupCustomer &&
                  customer.errors.groupCustomer && (
                    <div className="text-danger">
                      {customer.errors.groupCustomer}
                    </div>
                  )}
              </div>
              <div>
                <p>Địa chỉ</p>
                <input
                  type="text"
                  name="address"
                  onBlur={customer.handleBlur}
                  onChange={customer.handleChange}
                />
                {customer.touched.address && customer.errors.address && (
                  <div className="text-danger">{customer.errors.address}</div>
                )}
              </div>
              <div>
                <p>Số điện thoại *</p>
                <input
                  type="text"
                  name="phoneNumber"
                  onBlur={customer.handleBlur}
                  onChange={customer.handleChange}
                />
                {customer.touched.phoneNumber && customer.errors.phoneNumber && (
                  <div className="text-danger">{customer.errors.phoneNumber}</div>
                )}
              </div>
              <div>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  onBlur={customer.handleBlur}
                  onChange={customer.handleChange}
                />
                {customer.touched.email && customer.errors.email && (
                  <div className="text-danger">{customer.errors.email}</div>
                )}
              </div>
              
            </div>
          </div>
          
        </div>
        <div className="customer-add-submit">
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
      <ToastifyToast />
    </div>
  );
}

const validateCustomer = Yup.object().shape({
  name: Yup.string().required("Chưa nhập tên"),
  phoneNumber: Yup.string()
  .required("Chưa nhập số điện thoại") 
  .matches(VIETNAM_PHONE_REGEX, "Số điện thoại không hợp lệ (gồm 10 chữ số ..)"),
  address: Yup.string().required("Chưa nhập địa chỉ"),
  groupCustomer: Yup.string().required("Chưa chọn nhóm khách hàng"),
  email: Yup.string().notRequired(),
});
