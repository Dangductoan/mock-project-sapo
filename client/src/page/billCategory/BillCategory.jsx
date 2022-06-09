import React, { useEffect, useState } from 'react'

import Row from '../../component/row/Row'
import Form from '../../component/form/Form'
import BillCategoryService from '../../api/BillCategoryService'
import './BillCategory.css'
import { toast } from "react-toastify";
import ToastifyToast from '../../component/toast/template/ToastifyToast'
function BillCategory() {
  const [billCategories, setBillCategories] = useState([])
  const [billCategory, setBillCategory] = useState({})
  const [showFormUpdate, setShowFormUpdate] = useState(false)
  const [showFormCreate, setShowFormCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const [create, setCreate] = useState(false)
  const [index, setIndex] = useState()
  useEffect(() => {
    BillCategoryService.getBillCategory()
      .then(res => {
        const data = res.data;
        setBillCategories(data)
      })

  }, [update, create])
  const handleClick = () => {
    setShowFormCreate(!showFormCreate)
  }
  const handleUpdate = () => {
    setUpdate(!update)
  }
  const handleCreate = () => {
    setCreate(!create)
  }
  const handleBillCategory = (data) => {
    setBillCategory(data)
  }
  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };
  return (
    <>
      <div className="billCategory ml-230">
        <div className="billCategory-header">
          <h2 className="billCategory-title">
            Loại Phiếu Thu
          </h2>
          <div className="billCategory-btn ">
            <button style={{paddingLeft:" 5px"}}onClick={handleClick} className='btn'>
            <svg style={{paddingLeft:'10px',paddingRight:'10px'}}aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>
              Thêm Loại phiếu thu</button>
          </div>
        </div>
        <div className="billCategory-content">
          <div className="billCategory-table">
            <div className="columns">
              <h5>Tên</h5>
              <h5>Mã</h5>
              <h5>Mô tả</h5>

            </div>
            {billCategories.map(BillCategory => {

              const { name, code, description, id } = BillCategory;
              return <Row key={id} index={id} name={name} code={code} desc={description} show={showFormUpdate} setShow={setShowFormUpdate} setIndex={setIndex} handleBillCategory={handleBillCategory} />

            })}
            <div className="row-end">
              <h3>`Hiển thị kết quả từ 1 đến {billCategories.length}  trên tổng {billCategories.length}  `</h3>
            </div>

          </div>
        </div>
        <div className="billCategory-footer">
          <div className="billCategory-footer_wrap">
            <h3 className='sp'>Bạn có thể xem thêm về quản lý loại phiếu thu </h3>
            <a className="link" href="/">tại đây</a>

          </div>


        </div>
        <ToastifyToast />
      </div>

      {showFormUpdate && <Form title="Cập nhật loại phiếu thu" action="Lưu" show={showFormUpdate} showToast={showToast} setShow={setShowFormUpdate} id={index} handleUpdate={handleUpdate} bl={billCategory} />}
      {showFormCreate && <Form title="Thêm loại phiếu thu" action="Thêm" show={showFormCreate} showToast={showToast} setShow={setShowFormCreate} handleCreate={handleCreate} />}

    </>

  )
}

export default BillCategory