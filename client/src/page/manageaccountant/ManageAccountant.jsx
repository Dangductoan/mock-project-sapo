import React, { useEffect, useState } from 'react'
import ListAccountant from '../../component/list/ListAccoutant'
import FormAccountant from '../../component/form/FormAccountant'
import './ManageAccountant.css'
import AccountantService from '../../api/AccountantService'

function ManageAccountant(props) {

  const [accountant, setAccountant] = useState([])
  const [showFormUpdate, setShowFormUpdate] = useState(false)
  const [showFormCreate, setShowFormCreate] = useState(false)
  const [index, setIndex] = useState()
  const handleClick = () => {
    setShowFormCreate(!showFormCreate)
  }
  useEffect(() => {
    AccountantService.getAccountant()
      .then(res => {
        const data = res.data;
        console.log(data)
        setAccountant(data.users)
      })
  }, []);
 
    return (
        <>
          <div className="manageAccoutant ml-230">
            <div className="manageAccoutant-header">
              <h2 className="manageAccoutant-title">
                Danh sách nhân viên
              </h2>
              <div className="manageAccoutant-btn ">
                <button onClick={handleClick} className='btn'>Thêm nhân viên</button>
              </div>
            </div>
            <div className="manageAccoutant-content">
              <div className="manageAccoutant-table">
                <div className="column">
                  <input class="checkAllAccountant" type="checkbox" data-indeterminate="false" value=""/>
                  <h5>Tên</h5>
                  <h5>Số điện thoại</h5>
                  <h5>Địa chỉ</h5>
                  <h5>Ngày tạo</h5>
    
                </div>
                {accountant.map(account => {
                  const { id,name, phoneNumber, address,createdAt } = account;
                  return  <ListAccountant key={id} index={id} name={name}  phone={phoneNumber} address={address} createdAt={createdAt} show={showFormUpdate} setShow={setShowFormUpdate} setIndex={setIndex} />
    
                })}
               
    
              </div>
            </div>
    {/* footer */}
          </div>
    
          {showFormUpdate && <FormAccountant title="Cập nhật nhân viên" action="Lưu" show={showFormUpdate} setShow={setShowFormUpdate} id={index} />}
          {showFormCreate && <FormAccountant title="Thêm nhân viên" action="Thêm" show={showFormCreate} setShow={setShowFormCreate} />}
    
        </>
    
      )
    }
    


export default ManageAccountant;