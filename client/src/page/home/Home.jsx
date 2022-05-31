import React from 'react'
import './Home.css'
function Home() {
  return (
    <>
    <div className="home">
    <h1 className='home-title'>
    Phần mềm quản lý thu chi <br className="d-none d-lg-block"/>
    dành cho kế toán số 1 Việt Nam
            </h1>
      
      <span className="home-separate"></span>
      <p className="home-info">
        Giúp tiết kiệm thời gian, chi phí cũng như tiền bạc
      </p>
      <div className="home-btn">
        <button>Đăng nhập</button>
      </div>
    </div>
    </>
  )
}

export default Home