import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import CustomerService from "../../../../api/CustomerService";
import Modal from "../../../../component/modal/Modal";
import ToastifyToast from "../../../../component/toast/template/ToastifyToast";
import {
  CODE_REGEX,
  VIETNAMESE_ADDRESS_REGEX,
  VIETNAMESE_NAME_REGEX,
  VIETNAM_PHONE_REGEX,
} from "../../../../utils/regex";
import "./CustomerAddModal.css";

export default function CustomerAddModal({ open, setOpen, onCustomerChange }) {
  let user = JSON.parse(localStorage.getItem("user"));

  const customer = useFormik({
    initialValues: {
      name: "",
      code: "",
      address: "",
      email: "",
      groupCustomer: "",
      phoneNumber: "",
    },
    validationSchema: validateCustomer,
    onSubmit: (customer) => {
      // them truong createdBy tu user localStorage vao customer
      CustomerService.createCustomer({ ...customer, createdBy: user.name })
        .then(() => {
          showToast("Thêm khách hàng thành công", "success");
          onCustomerChange();
          setOpen(false);
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    },
  });

  useEffect(() => {
    customer.setErrors({});
    customer.setValues({
      name: "",
      code: "",
      address: "",
      email: "",
      groupCustomer: "",
      phoneNumber: "",
    });
    customer.setTouched({});
  }, [open]);

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  const handleOpen = () => setOpen(false);

  return (
    <>
      {open && (
        <Modal>
          <form className="modal-form" onSubmit={customer.handleSubmit}>
            <div className="modal-title">
              <h3>Thêm mới khách hàng</h3>
              <CloseIcon onClick={handleOpen} />
            </div>
            <div className="modal-content">
              <div className="content-field">
                <label>Tên khách hàng *</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="name"
                    onChange={customer.handleChange}
                    onBlur={customer.handleBlur}
                  />
                  {customer.touched.name && customer.errors.name && (
                    <div className="text-danger">{customer.errors.name}</div>
                  )}
                </div>
              </div>
              <div className="content-field">
                <label>Mã khách hàng *</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="code"
                    onBlur={customer.handleBlur}
                    onChange={customer.handleChange}
                  />
                  {customer.touched.code && customer.errors.code && (
                    <div className="text-danger">{customer.errors.code}</div>
                  )}
                </div>
              </div>
              <div className="content-field">
                <label>Số điện thoại *</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="phoneNumber"
                    onBlur={customer.handleBlur}
                    onChange={customer.handleChange}
                  />
                  {customer.touched.phoneNumber &&
                    customer.errors.phoneNumber && (
                      <div className="text-danger">
                        {customer.errors.phoneNumber}
                      </div>
                    )}
                </div>
              </div>
              <div className="content-field">
                <label>Địa chỉ</label>
                <div className="field-input">
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
              </div>
              <div className="content-field">
                <label>Email</label>
                <div className="field-input">
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
              <div className="content-field">
                <label>Nhóm khách hàng</label>
                <div className="field-input">
                  <select
                    name="groupCustomer"
                    onChange={customer.handleChange}
                    onBlur={customer.handleBlur}
                  >
                    <option value="">Chọn nhóm khách hàng</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Bán buôn">Bán buôn</option>
                    <option value="Bán lẻ">Bán lẻ</option>
                  </select>
                </div>
                {customer.touched.groupCustomer &&
                  customer.errors.groupCustomer && (
                    <div className="text-danger">
                      {customer.errors.groupCustomer}
                    </div>
                  )}
              </div>
            </div>
            <div className="modal-footer">
              <div className="form-btn">
                <button className="btn-cancle" onClick={handleOpen}>
                  Thoát
                </button>
                <button className="btn-create" type="submit">
                  Thêm
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
      <ToastifyToast />
    </>
  );
}

const validateCustomer = Yup.object().shape({
  name: Yup.string()
    .required("Tên không được để trống")
    .matches(VIETNAMESE_NAME_REGEX, "Tên không chứa số, ký tự đặc biệt"),
  code: Yup.string()
    .required("Code không được để trống")
    .matches(CODE_REGEX, "Code chỉ chứa chữ hoa và số, không có khoảng trắng"),
  phoneNumber: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(VIETNAM_PHONE_REGEX, "Số điện thoại không hợp lệ"),
  address: Yup.string().matches(
    VIETNAMESE_ADDRESS_REGEX,
    "Địa chỉ không chứa ký tự đặc biệt"
  ),
  email: Yup.string().email("Email không hợp lệ"),
  groupCustomer: Yup.string().required("Vui lòng chọn nhóm khách hàng"),
});
