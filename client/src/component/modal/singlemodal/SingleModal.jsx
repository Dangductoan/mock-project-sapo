import React from "react";

import Modal from "../Modal";
import CloseIcon from "@mui/icons-material/Close";

import "./SingleModal.css";

export default function SingleModal({ open, setOpen, title, onConfirm }) {
  const closeModal = () => setOpen(false);

  return (
    <>
      {open && (
        <Modal>
          <div className="single-modal">
            <div className="single-modal-title">
              <h3>{title}</h3>
              <CloseIcon onClick={closeModal} />
            </div>
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
