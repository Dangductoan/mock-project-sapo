import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AccountantService from "../../../api/AccountantService";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import "./AccountantAdd.css";
import {
  CODE_REGEX,
  VIETNAMESE_ADDRESS_REGEX,
  VIETNAMESE_NAME_REGEX,
  VIETNAM_PHONE_REGEX,
} from "../../../utils/regex";

export default function AccountantAdd() {
  const history = useHistory();
  const match = useRouteMatch();

  // const [accountant, setAccountant] = useState({});
  const accountant= useFormik({
    initialValues: {
      name:"",
      username: "",
      password: "",
      phoneNumber: "",
      address:""
    },
    validationSchema: validateAccountant,
    onSubmit: (accountant) => {
      AccountantService.createAccountant({ ...accountant})
        .then(() => {
          showToast("Thêm nhân viên thành công", "success");
        })
        .then((res) => {
          let path = match.path.substring(0, match.path.lastIndexOf("/"));
          history.push(`${path}/${res.data?.user?.id}`, {
            showAccountantAddSuccess: true,
          });
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    },
  });

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  return (
    <div className="accountant-add">
      <span
        className="accountant-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <ArrowBackIosNewIcon style={{ width: "15px" }} />
        <span>Danh sách nhân viên</span>
      </span>
      <div className="accountant-heading">
        <h2>Thêm mới nhân viên</h2>
      </div>
      <form onSubmit={accountant.handleSubmit}>
        <div className="accountant-content">
          <div className="accountant-info">
            <h3>Thông tin chung</h3>
            <div>
              <div>
                <p>Tên*</p>
                <input
                  type="text"
                  name="name"
                  onBlur={accountant.handleBlur}
                  onChange={accountant.handleChange}
                />
                {accountant.touched.name && accountant.errors.name && (
                  <div className="text-danger">{accountant.errors.name}</div>
                )}
              </div>
              <div>
                <p>Tên đăng nhập*</p>
                <input
                  type="text"
                  name="username"
                  onBlur={accountant.handleBlur}
                  onChange={accountant.handleChange}
                />
                {accountant.touched.username && accountant.errors.username && (
                  <div className="text-danger">{accountant.errors.username}</div>
                )}
              </div>
              <div>
                <p>Mật khẩu*</p>
                <input
                  type="password"
                  name="password"
                  onBlur={accountant.handleBlur}
                  onChange={accountant.handleChange}
                />
                {accountant.touched.password && accountant.errors.password && (
                  <div className="text-danger">{accountant.errors.password}</div>
                )}
              </div>
              <div>
                <p>Số điện thoại</p>
                <input
                  type="text"
                  name="phoneNumber"
                  onBlur={accountant.handleBlur}
                  onChange={accountant.handleChange}
                />
                {accountant.touched.phoneNumber && accountant.errors.phoneNumber && (
                  <div className="text-danger">{accountant.errors.phoneNumber}</div>
                )}
              </div>
              <div>
                <p>Địa chỉ</p>
                <input
                  type="text"
                  name="address"
                  onBlur={accountant.handleBlur}
                  onChange={accountant.handleChange}
                />
                {accountant.touched.address && accountant.errors.address && (
                  <div className="text-danger">{accountant.errors.address}</div>
                )}
              </div>
              
             
            </div>
          </div>
        
        </div>
        <div className="accountant-add-submit">
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

const validateAccountant= Yup.object().shape({
  name: Yup.string()
  .required("Tên không được để trống")
  .matches(VIETNAMESE_NAME_REGEX, "Tên không chứa số, ký tự đặc biệt"),
  username:Yup.string()
  .required("Tên tài khoản không được để trống"),
  password:Yup.string()
  .required("Mật khẩu không được để trống"),
  phoneNumber: Yup.string()
  .required("Số điện thoại không được để trống")
  .matches(VIETNAM_PHONE_REGEX, "Số điện thoại không hợp lệ (gồm 10 chữ số ..)"),
  address: Yup.string().matches(
  VIETNAMESE_ADDRESS_REGEX,   
  "Địa chỉ không chứa ký tự đặc biệt"
),
});
