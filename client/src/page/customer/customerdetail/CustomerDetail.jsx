import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useLocation,
  useParams,
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import CustomerService from "../../../api/CustomerService";

import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./CustomerDetail.css";

export default function CustomerDetail() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const { id } = useParams();
  if (!parseInt(id))
    history.push(`${match.path.substring(0, match.path.indexOf("/"))}/404`);

  const user = JSON.parse(localStorage.getItem("user"));

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    if (location.state?.showCustomerAddSuccess)
      toast.success("Thêm khách hàng thành công");
  }, [location.state?.showCustomerAddSuccess]);

  useEffect(() => {
    CustomerService.getCustomer(id)
      .then((res) => {
        setCustomer(res.data?.customer);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  const updateCustomer = () => {
    CustomerService.updateCustomer(id, {
      ...customer,
      createdBy: user.name,
    })
      .then((res) => {
        showToast("Cập nhật khách hàng thành công", "success");
      })
      .catch(({ response }) => {
        showToast(response.data?.error?.message, "error");
      });
  };
  const deleteCustomer = () => {
    CustomerService.deleteCustomer(id)
      .then((res) => {
        showToast("Xóa khách hàng thành công", "success");
        history.push("/chief-accountant/customers")
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
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  return (
    <div className="customer-add">
      <div
        className="customer-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <ArrowBackIosNewIcon style={{ width: "15px" }} />
        <Link>Danh sách khách hàng</Link>
      </div>
      <div className="customer-heading">
        <h2>Thông tin chi tiết khách hàng</h2>
      </div>
      <div className="customer-content">
        <div className="customer-info">
          <h3>Thông tin chung</h3>
          <div>
            <div>
                <p>Tên *</p>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                />
               
            </div>
              <div>
                <p>Nhóm khách hàng *</p>
                <select
                  name="groupCustomer"
                  value={customer.groupCustomer}
                  onChange={handleInputChange}
                >
                  <option value={customer.groupCustomer}>{customer.groupCustomer}</option>
              {customer.groupCustomer !== "Enterprise" &&  
                  <option value="Enterprise">Enterprise</option> }
              {customer.groupCustomer !== "Bán lẻ" &&       
                  <option value="Bán lẻ">Bán lẻ</option>   }
              {customer.groupCustomer !== "Bán buôn" &&  
                  <option value="Bán buôn">Bán buôn</option> }
                </select>
            
              </div>
              <div>
                <p>Địa chỉ</p>
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                />
                
              </div>
              <div>
                <p>Số điện thoại *</p>
                <input
                  type="text"
                  name="phoneNumber"
                  value={customer.phoneNumber}
                  onChange={handleInputChange}
                />
               
              </div>
              <div>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                />
                
              </div>
            </div>
        </div>
      </div>
      <div className="customer-add-submit">
        <button className="btn-create" onClick={updateCustomer}>
          Lưu
        </button>
        <button className="btn-delete" onClick={deleteCustomer}>
          Xóa
        </button>
      </div>
      <ToastifyToast />
    </div>
  );
}
