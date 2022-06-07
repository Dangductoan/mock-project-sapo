import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useLocation,
  useParams,
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import AccountantService from "../../../api/AccountantService";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./AccountantDetail.css";

export default function AccountantDetail() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const { id } = useParams();
  if (!parseInt(id))
    history.push(`${match.path.substring(0, match.path.indexOf("/"))}/404`);

  const [accountant, setAccountant] = useState({});

  useEffect(() => {
    if (location.state?.showAccountantAddSuccess)
      toast.success("Thêm nhân viên thành công");
  }, [location.state?.showAccountantAddSuccess]);

  useEffect(() => {
    AccountantService.getAccountant(id)
      .then((res) => {
        setAccountant(res.data?.user);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  const updateAccountant = () => {
    AccountantService.updateAccountant(id, {
      ...accountant
    })
      .then((res) => {
        showToast("Cập nhật nhân viên thành công", "success");
      })
      .catch(({ response }) => {
        showToast(response.data?.error?.message, "error");
      });
  };
  const deleteAccountant = () => {
    AccountantService.deleteAccountant(id)
      .then((res) => {
        showToast("Xóa nhân viên thành công", "success");
        history.push("/chief-accountant/users")
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
    setAccountant({
      ...accountant,
      [name]: value,
    });
  };

  return (
    <div className="accountant-add">
      <div
        className="accountant-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <ArrowBackIosNewIcon style={{ width: "15px" }} />
        <Link>Phiếu thu</Link>
      </div>
      <div className="accountant-heading">
        <h2>Thông tin chi tiết phiếu thu</h2>
      </div>
      <div className="accountant-content">
        <div className="accountant-info">
          <h3>Thông tin chung</h3>
          <div>
            <div>
              <p>Tên</p>
              <input
                type="text"
                name="Name"
                onChange={handleInputChange}
                value={accountant.name}
              />
              
            </div>
            <div>
              <p>Tên đăng nhập</p>
              <input
                type="text"
                name="username"
                onChange={handleInputChange}
                value={accountant.username}
              />
            </div>
            <div>
              <p>Mật khẩu</p>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={accountant.password}
              />
            </div>
            <div>
              <p>Số điện thoại</p>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleInputChange}
                value={accountant.phoneNumber}
              />
            </div>
            <div>
              <p>Địa chỉ</p>
              <input
                type="text"
                name="address"
                onChange={handleInputChange}
                value={accountant.address}
              />
              </div>
            </div>
          </div>
      </div>
      <div className="accountant-add-submit">
        <button className="btn-create" onClick={updateAccountant}>
          Lưu
        </button>
        <button className="btn-delete" onClick={deleteAccountant}>
          Xóa
        </button>
      </div>
      <ToastifyToast />
    </div>
  );
}
