import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className="navbar">
    <div className="navbar_container container">
         <div className="navbar_logo">
             <a href="/" className="logo">
             <img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202205240426" alt="Sapo logo" />

             </a>
         </div>
         <ul className="navbar_list">
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/about'>Về chúng tôi?</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/product'>Sản phẩm</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/support'>Hỗ trợ</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/login'>Đăng nhập</Link></li>
         </ul>
    </div>
    </div>

  )
}

export default Navbar