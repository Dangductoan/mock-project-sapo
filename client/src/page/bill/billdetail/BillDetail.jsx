import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useParams, Link, useHistory } from "react-router-dom";

import BillService from "../../../api/BillService";

import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import "./BillDetail.css";

export default function BillDetail() {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [bill, setBill] = useState({});
  let billCode = "";

  useEffect(() => {
    if (location.state?.showBillAddSuccess)
      toast.success("Thêm phiếu thu ngân thành công");
  });

  useEffect(() => {
    BillService.getBill(id)
      .then((res) => {
        setBill(res.data?.bill);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  const updateBill = () => {
    BillService.updateBill(id, {
      ...bill,
      modifidedBy: user.name,
    })
      .then((res) => {
        showToast("Cập nhật phiếu thu thành công", "success");
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

  return (
    <div className="bill-add">
      <div
        className="bill-bread-crumb"
        onClick={() => history.push("/accountant/bills")}
      >
        <ArrowBackIosNewIcon style={{ width: "15px" }} />
        <Link>Phiếu thu</Link>
      </div>
      <div className="bill-heading">
        <h2>Thông tin chi tiết phiếu thu</h2>
      </div>
      <div className="bill-content">
        <div className="bill-info">
          <h3>Thông tin chung</h3>
          <div>
            <div>
              <p>Tên khách hàng *</p>
              <select
                name="customerName"
                onChange={handleInputChange}
                className="select-update"
              >
                <option value="">{bill?.customer?.name}</option>
              </select>
            </div>
            <div>
              <p>Loại phiếu thu *</p>
              <select
                name="billCategoryName"
                onChange={handleInputChange}
                className="select-update"
              >
                <option value="">{bill?.billCategory?.name}</option>
              </select>
            </div>
            <div>
              <p>Mã phiếu</p>
              <input
                type="text"
                name="code"
                onChange={handleInputChange}
                value={bill.code}
              />
            </div>
            <div>
              <p>Giá trị *</p>
              <input
                type="number"
                name="totalValue"
                onChange={handleInputChange}
                value={bill.totalValue}
              />
            </div>
            <div>
              <p>Hình thức thanh toán</p>
              <select
                name="payment"
                onChange={handleInputChange}
                className="select-update"
              >
                <option value="">{bill?.payment}</option>
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
              value={bill.description}
            />
          </div>
        </div>
      </div>
      <div className="bill-add-submit">
        <button className="btn-create" onClick={updateBill}>
          Lưu
        </button>
      </div>
      <ToastifyToast />
    </div>
  );
}
