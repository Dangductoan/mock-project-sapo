import { faArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerService from "../../../../api/CustomerService";
import Modal from "../../../../component/modal/Modal";
import ToastifyToast from "../../../../component/toast/template/ToastifyToast";
import { randomCode } from "../../../../utils/StringRandom";
import { validateCustomerCreate } from "../../../../validation/customer";
import "./CustomerAddModal.css";

export default function CustomerAddModal({ open, setOpen, onCustomerChange }) {
  let user = JSON.parse(localStorage.getItem("user"));

  const customer = useFormik({
    initialValues: {
      name: "",
      code: randomCode(10),
      address: "",
      email: "",
      groupCustomer: "",
      phoneNumber: "",
    },
    validationSchema: validateCustomerCreate,
    onSubmit: (customer) => {
      // them truong createdBy tu user localStorage vao customer
      CustomerService.createCustomer({ ...customer, createdBy: user.name })
        .then((res) => {
          showToast("Thêm khách hàng thành công", "success");
          onCustomerChange(res.data?.customer);
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
      code: randomCode(10),
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
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleOpen}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <div className="modal-content">
              <div className="content-field">
                <label>
                  Tên khách hàng <span className="required-asterisk">*</span>
                </label>
                <div className="field-input">
                  <input
                    className="customer-input"
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
                <label>
                  Mã khách hàng <span className="required-asterisk">*</span>
                </label>
                <div className="field-input">
                  <span className="customer-input">
                    <input
                      className="input-hidden"
                      name="code"
                      onBlur={customer.handleBlur}
                      onChange={customer.handleChange}
                      value={customer.values.code}
                    />
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      onClick={() => {
                        customer.setFieldValue("code", randomCode(10));
                      }}
                      title="Tự động tạo"
                    />
                  </span>
                  {customer.touched.code && customer.errors.code && (
                    <div className="text-danger">{customer.errors.code}</div>
                  )}
                </div>
              </div>
              <div className="content-field">
                <label>
                  Số điện thoại <span className="required-asterisk">*</span>
                </label>
                <div className="field-input">
                  <input
                    className="customer-input"
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
                    className="customer-input"
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
                    className="customer-input"
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
                <label>
                  Nhóm khách hàng <span className="required-asterisk">*</span>
                </label>
                <div className="field-input">
                  <select
                    className="customer-input"
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
                <button
                  type="button"
                  className="btn-cancle"
                  onClick={handleOpen}
                >
                  Hủy
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
