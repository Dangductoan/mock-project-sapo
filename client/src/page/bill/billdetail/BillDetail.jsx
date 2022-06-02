import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import ToastifyToast from "../../../component/toast/template/ToastifyToast";

import "./BillDetail.css";

export default function BillDetail() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showBillAddSuccess)
      toast.success("Thêm phiếu thu ngân thành công");
  });

  return (
    <div className="bill-detail">
      <p>Bill Detail</p>
      <ToastifyToast />
    </div>
  );
}
