import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { toast } from "react-toastify";
import BillService from "../../../api/BillService";
import ReactNumberInputFormat from "../../../component/numberformat/template/ReactNumberInputFormat";
import ToastifyToast from "../../../component/toast/template/ToastifyToast";
import { validateBillUpdate } from "../../../validation/bill";
import "./BillDetail.css";

export default function BillDetail() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const { id } = useParams();
  if (!parseInt(id))
    history.push(`${match.path.substring(0, match.path.indexOf("/"))}/404`);

  const user = JSON.parse(localStorage.getItem("user"));

  const bill = useFormik({
    initialValues: {
      code: "",
      totalValue: "",
      description: "",
    },
    validationSchema: validateBillUpdate,
    onSubmit: (bill) => {
      if (!Number.isInteger(bill.totalValue))
        bill.totalValue = parseFloat(bill.totalValue.replace(/,/g, ""));
      BillService.updateBill(id, {
        ...bill,
        modifidedBy: user.name,
      })
        .then(() => {
          showToast("Cập nhật phiếu thu thành công", "success");
        })
        .catch(({ response }) => {
          showToast(response.data?.error?.message, "error");
        });
    },
  });

  useEffect(() => {
    if (location.state?.showBillAddSuccess)
      toast.success("Thêm phiếu thu ngân thành công");
  }, [location.state?.showBillAddSuccess]);

  useEffect(() => {
    BillService.getBill(id)
      .then((res) => {
        bill.setValues(res.data?.bill);
      })
      .catch(({ res }) => console.log(res.data?.error?.message));
  }, [id]);

  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };

  return (
    <div className="bill-add">
      <div
        className="bill-bread-crumb"
        onClick={() =>
          history.push(
            `${match.path.substring(0, match.path.lastIndexOf("/"))}`
          )
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "10px" }} />
        <span>Phiếu thu</span>
      </div>
      <div className="bill-heading">
        <h2>Thông tin chi tiết phiếu thu</h2>
      </div>
      <form onSubmit={bill.handleSubmit}>
        <div className="bill-content">
          <div className="bill-info">
            <h3>Thông tin chung</h3>
            <div>
              <div>
                <p>Tên khách hàng *</p>
                <div className="info-not-updated">
                  <select name="customerName">
                    <option value={bill.values?.customer?.name}>
                      {bill.values?.customer?.name}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <p>Loại phiếu thu *</p>
                <div className="info-not-updated">
                  <select name="billCategoryName">
                    <option value={bill.values?.billCategory?.name}>
                      {bill.values?.billCategory?.name}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <p>Mã phiếu *</p>
                <input
                  type="text"
                  name="code"
                  onBlur={bill.handleBlur}
                  onChange={bill.handleChange}
                  value={bill.values?.code}
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
                  value={bill.values?.totalValue}
                />
                {bill.touched.totalValue && bill.errors.totalValue && (
                  <div className="text-danger">{bill.errors.totalValue}</div>
                )}
              </div>
              <div>
                <p>Hình thức thanh toán</p>
                <div className="info-not-updated">
                  <select name="payment">
                    <option value={bill.values?.payment}>
                      {bill.values?.payment}
                    </option>
                  </select>
                </div>
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
                value={bill.values?.description}
              />
            </div>
          </div>
        </div>

        <div className="bill-add-submit">
          <button className="btn-create" type="submit">
            Lưu
          </button>
        </div>
      </form>
      <ToastifyToast />
    </div>
  );
}
