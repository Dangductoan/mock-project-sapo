import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastifyToast from "../../../../component/toast/template/ToastifyToast";
import CustomerService from "../../../../api/CustomerService";
import Modal from "../../../../component/modal/Modal";
import "./CustomerAddModal.css";
import "react-toastify/dist/ReactToastify.css";

export default function CustomerAddModal({ open, setOpen, onCustomerChange }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const [customer, setCustomer] = useState({});

  // reset customer state after opening or closing this modal.
  useEffect(() => {
    setCustomer({})
  }, [open])

  const addCustomer = (e) => {
    e.preventDefault();

    // them truong user vao customer
    CustomerService.createCustomer({ ...customer, createdBy: user.name })
      .then(() => {
        showToast("Thêm khách hàng thành công", "success");
        onCustomerChange();
        setOpen(false);
      })
      .catch(({ response }) => {
        showToast(response.data?.error?.message, "error");
      });
  };

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message)
  };

  const handleOpen = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  return (
    <>
      {open && (
        <Modal>
          <form onSubmit={addCustomer} className="modal-form">
            <div className="modal-title">
              <h3>Thêm mới khách hàng</h3>
              <CloseIcon onClick={handleOpen} />
            </div>
            <div className="modal-content">
              <div className="content-field">
                <label htmlFor="">Tên khách hàng *</label>
                <div className="field-input">
                  <input type="text" name="name" onChange={handleInputChange} />
                </div>
              </div>
              <div className="content-field">
                <label htmlFor="">Mã khách hàng *</label>
                <div className="field-input">
                  <input type="text" name="code" onChange={handleInputChange} />
                </div>
              </div>
              <div className="content-field">
                <label htmlFor="">Số điện thoại *</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="content-field">
                <label htmlFor="">Địa chỉ</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="address"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="content-field">
                <label htmlFor="">Email</label>
                <div className="field-input">
                  <input
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="content-field">
                <label htmlFor="">Nhóm khách hàng</label>
                <div className="field-input">
                  <select name="groupCustomer" id="" onChange={handleInputChange}>
                    <option value="">Chọn nhóm khách hàng</option>
                    <option value="Tiền mặt">Enterprise</option>
                    <option value="Bán buôn">Bán buôn</option>
                    <option value="Bán lẻ">Bán lẻ</option>
                  </select>
                </div>
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
