import React from "react";
import AccountantSidebar from "../../component/sidebar/AccountantSidebar";
import "./AccountantLayout.css"

export default function AccountantLayout(props) {
  return (
    <div className="accountant-layout">
      <div className="layout-left">
        <AccountantSidebar />
      </div>
      <div className="layout-right">
        {props.children}
      </div>
    </div>
  );
};
