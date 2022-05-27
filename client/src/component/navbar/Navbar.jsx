import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className="navbar grid">
         <div className="navbar_logo">
             <a href="/" className="logo">
             <img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202205240426" alt="Sapo logo" />

             </a>
         </div>
         <ul className="navbar_list">
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/about'>About</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/customer'>Customer</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/support'>Support</Link></li>
             <li className='navbar_list-item'>
                 <Link className='navbar_list-item_link'to='/login'>Login</Link></li>
         </ul>
    </div>
  )
}

export default Navbar