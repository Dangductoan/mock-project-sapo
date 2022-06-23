import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import AuthService from "../../api/AuthService";
import SingleModal from "../modal/singlemodal/SingleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function SidebarAcc() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/accountant">
            <img
              className="sapo-logo"
              src="https://sapo.dktcdn.net/fe-cdn-production/images/sapo-pos-w.png"
              alt="Sapo-logo"
            />
          </Link>
        </div>
        <div className="sidebar-logo_icon">
          <img
            src="https://sapo.dktcdn.net/fe-cdn-production/images/menu-toggle.svg"
            alt="Sapo"
          />
        </div>
      </div>
      <div className="sidebar-container">
        <ul className="sidebar-list">
          <li className="sidebar-list_item">
            <Link className="sidebar-list_link" to="/accountant/bills">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 483.2 483.2"
                aria-hidden="true"
              >
                <path d="M367.4 182.2H12c-6.6 0-12 5.4-12 12v202.6c0 6.6 5.4 12 12 12h355.4c6.6 0 12-5.4 12-12V194.2c0-6.6-5.4-12-12-12zm-12 202.6H24V206.2h331.4v178.6z"></path>
                <path d="M80.8 307.2h29.8c6.6 0 12-5.4 12-12s-5.4-12-12-12H80.8c-6.6 0-12 5.4-12 12s5.3 12 12 12zM419.2 128.1H63.8c-6.6 0-12 5.4-12 12s5.4 12 12 12h343.4v190.6c0 6.6 5.4 12 12 12s12-5.4 12-12V140.1c0-6.6-5.4-12-12-12z"></path>
                <path d="M471.2 74.4H115.8c-6.6 0-12 5.4-12 12s5.4 12 12 12h343.4V289c0 6.6 5.4 12 12 12s12-5.4 12-12V86.4c0-6.6-5.4-12-12-12zM268.8 307.2h29.8c6.6 0 12-5.4 12-12s-5.4-12-12-12h-29.8c-6.6 0-12 5.4-12 12s5.4 12 12 12zM180.3 307.4h18.8c4.7 0 8.6 3.8 8.6 8.6s-3.8 8.6-8.6 8.6h-33.7c-6.6 0-12 5.4-12 12s5.4 12 12 12h12.3v7.9c0 6.6 5.4 12 12 12s12-5.4 12-12v-8c16.7-1.3 30-15.4 30-32.5 0-18-14.6-32.6-32.6-32.6h-18.8c-4.7 0-8.6-3.8-8.6-8.6 0-4.7 3.8-8.6 8.6-8.6h33.1c6.6 0 12-5.4 12-12s-5.4-12-12-12h-11.7v-7.6c0-6.6-5.4-12-12-12s-12 5.4-12 12v7.8c-16.7 1.3-30 15.4-30 32.5 0 17.9 14.6 32.5 32.6 32.5z"></path>
              </svg>
              Phiếu thu
            </Link>
          </li>
          <li className="sidebar-list_item">
            <span
              className="sidebar-list_link"
              onClick={() => setOpenLogoutModal(true)}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{width: "20px", height: "20px", marginRight: "10px"}} />
              Đăng xuất
            </span>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer"></div>
      <SingleModal
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
        title="Bạn có chắc muốn đăng xuất"
        onConfirm={AuthService.logout}
      />
    </div>
  );
}

export default SidebarAcc;
