import React from "react";

import Modal from "../Modal";
import CloseIcon from "@mui/icons-material/Close";

import "./SingleModal.css";

export default function SingleModal({
  open,
  setOpen,
  title,
  onConfirm,
  children,
  ...operators
}) {
  const closeModal = () => setOpen(false);

  let className = operators.hasOwnProperty("className")
    ? operators.className
    : "";

  return (
    <>
      {open && (
        <Modal>
          <div className={`single-modal ${className}`}>
            <div className="single-modal-title">
              <h3>{title}</h3>
              <CloseIcon onClick={closeModal} />
            </div>
            {children && <div className="single-modal-content">{children}</div>}
            <div className="single-modal-footer">
              <button className="btn-cancle" onClick={closeModal}>
                Hủy
              </button>
              <button className="btn-create" onClick={onConfirm}>
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
