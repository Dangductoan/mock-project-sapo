import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import AuthService from "../../api/AuthService";
import SingleModal from "../modal/singlemodal/SingleModal";

function SideBarChief() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [isActive, setIsACtive] = useState(false)
  const handleClick = (e) => {
    document.querySelector('.active-item').classList.remove('active-item')
    e.target.classList.add("active-item")
    document.querySelector('.sidebar-subList').classList.remove('block')
    document.querySelector('.active-sub_item') && document.querySelector('.active-sub_item').classList.remove('active-sub_item')
  }
  const handleClickTwo = (e) => {
    if(e.target.classList.contains("sidebar-list_link")) {
      document.querySelector('.sidebar-subList').classList.toggle('block')

      document.querySelector('.active-item').classList.remove('active-item')
      e.target.classList.add("active-item")
      setIsACtive(!isActive)
    }
  }
  
  const handleClick3 = (e) => {
    document.querySelector('.active-sub_item') && document.querySelector('.active-sub_item').classList.remove('active-sub_item')
    e.target.classList.add('active-sub_item');
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/chief-accountant">
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

          <li className="sidebar-list_item  " onClick={handleClickTwo}>
            <div className="sidebar-list_link active-item">
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
              Phi???u thu
              {/* <Arrow /> */}
              <svg className={`MuiSvgIcon-root  rorate-2 ${isActive ? 'rorate-0' : ''} `} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
            </div>
          </li>
          <ul className="sidebar-subList block ">
            <li className="sidebar-subList_item ">
              <Link
                onClick={handleClick3}
                className="sidebar-subList_item-link active-sub_item"
                to="/chief-accountant/bills"
              >
                Danh s??ch phi???u thu
              </Link>
            </li>
            <li className="sidebar-subList_item">
              <Link
                onClick={handleClick3}
                className="sidebar-subList_item-link"
                to="/chief-accountant/bill-category"
              >
                Lo???i phi???u thu
              </Link>
            </li>
          </ul>
          <li className="sidebar-list_item" onClick={handleClick}>
            <Link className="sidebar-list_link" to="/chief-accountant/users">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 482.9 482.9"
                aria-hidden="true"
              >
                <path d="M239.7 260.2h3.2c29.3-.5 53-10.8 70.5-30.5 38.5-43.4 32.1-117.8 31.4-124.9-2.5-53.3-27.7-78.8-48.5-90.7C280.8 5.2 262.7.4 242.5 0H240.8c-11.1 0-32.9 1.8-53.8 13.7-21 11.9-46.6 37.4-49.1 91.1-.7 7.1-7.1 81.5 31.4 124.9 17.4 19.7 41.1 30 70.4 30.5zm-75.1-152.9c0-.3.1-.6.1-.8 3.3-71.7 54.2-79.4 76-79.4H241.9c27 .6 72.9 11.6 76 79.4 0 .3 0 .6.1.8.1.7 7.1 68.7-24.7 104.5-12.6 14.2-29.4 21.2-51.5 21.4h-1c-22-.2-38.9-7.2-51.4-21.4-31.7-35.6-24.9-103.9-24.8-104.5z"></path>
                <path d="M446.8 383.6v-.3c0-.8-.1-1.6-.1-2.5-.6-19.8-1.9-66.1-45.3-80.9-.3-.1-.7-.2-1-.3-45.1-11.5-82.6-37.5-83-37.8-6.1-4.3-14.5-2.8-18.8 3.3-4.3 6.1-2.8 14.5 3.3 18.8 1.7 1.2 41.5 28.9 91.3 41.7 23.3 8.3 25.9 33.2 26.6 56 0 .9 0 1.7.1 2.5.1 9-.5 22.9-2.1 30.9-16.2 9.2-79.7 41-176.3 41-96.2 0-160.1-31.9-176.4-41.1-1.6-8-2.3-21.9-2.1-30.9 0-.8.1-1.6.1-2.5.7-22.8 3.3-47.7 26.6-56 49.8-12.8 89.6-40.6 91.3-41.7 6.1-4.3 7.6-12.7 3.3-18.8-4.3-6.1-12.7-7.6-18.8-3.3-.4.3-37.7 26.3-83 37.8-.4.1-.7.2-1 .3-43.4 14.9-44.7 61.2-45.3 80.9 0 .9 0 1.7-.1 2.5v.3c-.1 5.2-.2 31.9 5.1 45.3 1 2.6 2.8 4.8 5.2 6.3 3 2 74.9 47.8 195.2 47.8s192.2-45.9 195.2-47.8c2.3-1.5 4.2-3.7 5.2-6.3 5-13.3 4.9-40 4.8-45.2z"></path>
              </svg>
              Qu???n l?? nh??n vi??n
            </Link>
          </li>
          <li className="sidebar-list_item" onClick={handleClick}>
            <Link
              className="sidebar-list_link"
              to="/chief-accountant/customers"
            >
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path d="M192 176c-17.344 0-32-10.976-32-24s14.656-24 32-24c8.704 0 16.832 2.688 22.848 7.616 6.848 5.568 16.896 4.512 22.528-2.304 5.568-6.848 4.544-16.928-2.304-22.528-7.712-6.272-17.056-10.496-27.072-12.768V80c0-8.832-7.168-16-16-16s-16 7.168-16 16v17.984c-27.52 6.272-48 28-48 54.016 0 30.88 28.704 56 64 56 17.344 0 32 10.976 32 24s-14.656 24-32 24c-8.704 0-16.832-2.688-22.848-7.616-6.88-5.6-16.928-4.544-22.496 2.304-5.6 6.848-4.576 16.928 2.272 22.528 7.712 6.272 17.056 10.496 27.072 12.8V304c0 8.832 7.168 16 16 16s16-7.168 16-16v-17.984c27.52-6.272 48-28 48-54.016 0-30.88-28.704-56-64-56z"></path>
                <path d="M446.752 137.856a15.831 15.831 0 0 0-3.456-5.184L315.328 4.704a15.831 15.831 0 0 0-5.184-3.456C308.224.448 306.144 0 304 0H96C78.368 0 64 14.368 64 32v448c0 17.632 14.368 32 32 32h320c17.632 0 32-14.368 32-32V144c0-2.144-.448-4.224-1.248-6.144zM320 54.624L393.376 128H320V54.624zM416 496v-16H96V32h192v96c0 17.632 14.368 32 32 32h96v320h.032L416 496z"></path>
                <path d="M368 224h-64c-8.832 0-16 7.136-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM368 288h-64c-8.832 0-16 7.136-16 16s7.168 16 16 16h64c8.832 0 16-7.168 16-16s-7.168-16-16-16zM368 352H144c-8.832 0-16 7.136-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16s-7.168-16-16-16zM368 416H144c-8.832 0-16 7.136-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16s-7.168-16-16-16z"></path>
              </svg>
              Qu???n l?? kh??ch h??ng
            </Link>
          </li>
          <li className="sidebar-list_item" onClick={handleClick}>
            <Link className="sidebar-list_link" to="/chief-accountant/report">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path d="M501.333 490.667H10.667C4.779 490.667 0 495.445 0 501.333 0 507.221 4.779 512 10.667 512h490.667c5.888 0 10.667-4.779 10.667-10.667-.001-5.888-4.78-10.666-10.668-10.666z"></path>
                <path d="M96 362.667H32c-5.888 0-10.667 4.779-10.667 10.667v128C21.333 507.221 26.112 512 32 512h64c5.888 0 10.667-4.779 10.667-10.667v-128c0-5.888-4.779-10.666-10.667-10.666zm-10.667 128H42.667V384h42.667v106.667zM224 256h-64c-5.888 0-10.667 4.779-10.667 10.667v234.667c0 5.888 4.779 10.667 10.667 10.667h64c5.888 0 10.667-4.779 10.667-10.667V266.667c0-5.888-4.779-10.667-10.667-10.667zm-10.667 234.667h-42.667V277.333h42.667v213.334zM352 298.667h-64c-5.888 0-10.667 4.779-10.667 10.667v192c0 5.888 4.779 10.667 10.667 10.667h64c5.888 0 10.667-4.779 10.667-10.667v-192c0-5.889-4.779-10.667-10.667-10.667zm-10.667 192h-42.667V320h42.667v170.667zM480 170.667h-64c-5.888 0-10.667 4.779-10.667 10.667v320c0 5.888 4.779 10.667 10.667 10.667h64c5.888 0 10.667-4.779 10.667-10.667v-320c0-5.889-4.779-10.667-10.667-10.667zm-10.667 320h-42.667V192h42.667v298.667zM64 192c-23.531 0-42.667 19.136-42.667 42.667 0 23.531 19.136 42.667 42.667 42.667 23.531 0 42.667-19.136 42.667-42.667C106.667 211.136 87.531 192 64 192zm0 64c-11.776 0-21.333-9.579-21.333-21.333 0-11.755 9.557-21.333 21.333-21.333s21.333 9.579 21.333 21.333C85.333 246.421 75.776 256 64 256zM192 85.333c-23.531 0-42.667 19.136-42.667 42.667 0 23.531 19.136 42.667 42.667 42.667s42.667-19.136 42.667-42.667c0-23.531-19.136-42.667-42.667-42.667zm0 64c-11.776 0-21.333-9.579-21.333-21.333 0-11.755 9.557-21.333 21.333-21.333s21.333 9.579 21.333 21.333c0 11.755-9.557 21.333-21.333 21.333zM320 128c-23.531 0-42.667 19.136-42.667 42.667 0 23.531 19.136 42.667 42.667 42.667 23.531 0 42.667-19.136 42.667-42.667C362.667 147.136 343.531 128 320 128zm0 64c-11.776 0-21.333-9.579-21.333-21.333 0-11.755 9.557-21.333 21.333-21.333s21.333 9.579 21.333 21.333c0 11.754-9.557 21.333-21.333 21.333zM448 0c-23.531 0-42.667 19.136-42.667 42.667 0 23.531 19.136 42.667 42.667 42.667 23.531 0 42.667-19.136 42.667-42.667C490.667 19.136 471.531 0 448 0zm0 64c-11.776 0-21.333-9.579-21.333-21.333 0-11.755 9.557-21.333 21.333-21.333s21.333 9.579 21.333 21.333C469.333 54.421 459.776 64 448 64z"></path>
                <path d="M432.939 57.728c-4.16-4.16-10.923-4.16-15.083 0l-82.773 82.773c-4.16 4.16-4.16 10.923 0 15.083a10.716 10.716 0 0 0 7.552 3.115c2.709 0 5.44-1.024 7.531-3.115l82.773-82.773c4.16-4.16 4.16-10.923 0-15.083zM294.208 146.048l-68.523-19.541c-5.739-1.664-11.563 1.664-13.163 7.339-1.621 5.675 1.664 11.563 7.317 13.184l68.523 19.541a10.675 10.675 0 0 0 13.184-7.339c1.622-5.653-1.663-11.563-7.338-13.184zM175.36 141.291c-3.669-4.608-10.368-5.355-14.976-1.707l-80.427 64.128c-4.608 3.691-5.376 10.389-1.685 14.997a10.658 10.658 0 0 0 8.341 4.011c2.325 0 4.672-.768 6.635-2.304l80.427-64.128c4.608-3.691 5.376-10.389 1.685-14.997z"></path>
              </svg>
              B??o c??o
            </Link>
          </li>
          <li className="sidebar-list_item">
            <span
              className="sidebar-list_link"
              onClick={() => setOpenLogoutModal(true)}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} style={{width: "20px", height: "20px", marginRight: "10px"}} />
              ????ng xu???t
            </span>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer"></div>
      <SingleModal
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
        title="B???n c?? ch???c mu???n ????ng xu???t"
        onConfirm={AuthService.logout}
        style={{ zIndex: '1000' }}
      />
    </div>
  );
}

export default SideBarChief;
