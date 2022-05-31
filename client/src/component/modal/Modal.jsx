import React from "react";
import "./Modal.css";

export default function Modal(props) {
  return (
    <>
      <div className="modal">
        {props.children}
      </div>

      <div className="overlay"></div>
    </>
  );
}
