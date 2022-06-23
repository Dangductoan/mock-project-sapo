import React, { useEffect, useState } from 'react'
import MaterialPagination from '../../component/pagination/template/MaterialPagination'
import Row from '../../component/row/Row'
import Form from '../../component/form/Form'
import BillCategoryService from '../../api/BillCategoryService'
import './BillCategory.css'
import { toast } from "react-toastify";
import ToastifyToast from '../../component/toast/template/ToastifyToast'
function BillCategory() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [billCategories, setBillCategories] = useState([])
  const [billCategory, setBillCategory] = useState({})
  const [showFormUpdate, setShowFormUpdate] = useState(false)
  const [showFormCreate, setShowFormCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const [create, setCreate] = useState(false)
  const [index, setIndex] = useState()
  // const [page, setPage] = useState(1);
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
          <p>Xin chào "{user.name}"</p>
        </div>
        <div className="billCategory-btn ">
          <button onClick={handleClick} className='btn'>

            Thêm Loại phiếu thu</button>
        </div>
        <div className="billCategory-content">
          <table className="billCategory-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mã</th>
                <th>Mô tả</th>
              </tr>
            </thead>


            <tbody>
              {billCategories.map(BillCategory => {

                const { name, code, description, id } = BillCategory;
                return <Row key={id} index={id} name={name} code={code} desc={description} show={showFormUpdate} setShow={setShowFormUpdate} setIndex={setIndex} handleBillCategory={handleBillCategory} />

              })}
            </tbody>



        <div className="pagination">
          <MaterialPagination
            // count={totalPage}
            page={ 1}
            // onChange={handlePaginationChange}
          />
        </div>
          </table>
        </div>
        <ToastifyToast />
      </div>

      {showFormUpdate && <Form title="Cập nhật loại phiếu thu" action="Lưu" show={showFormUpdate} showToast={showToast} setShow={setShowFormUpdate} id={index} handleUpdate={handleUpdate} bl={billCategory} />}
      {showFormCreate && <Form title="Thêm loại phiếu thu" action="Thêm" show={showFormCreate} showToast={showToast} setShow={setShowFormCreate} handleCreate={handleCreate} />}

    </>

  )
}

export default BillCategory