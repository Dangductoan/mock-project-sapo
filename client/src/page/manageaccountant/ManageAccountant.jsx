import React, { useEffect, useState } from 'react'
import ListAccountant from '../../component/list/ListAccoutant'
import FormAccountant from '../../component/form/FormAccountant.jsx'
import './ManageAccountant.css'
import AccountantService from '../../api/AccountantService'
import { toast } from "react-toastify";
import ToastifyToast from "../../component/toast/template/ToastifyToast";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ManageAccountant(props) {
  const history = useHistory;
  const [accountants, setAccountants] = useState([])
  const [accountant, setAccountant] = useState({})
  const [showFormUpdate, setShowFormUpdate] = useState(false)
  const [showFormCreate, setShowFormCreate] = useState(false)
  const [index, setIndex] = useState()
  const [create, setCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const [del, setDel] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [check, setCheck] = useState([])

  const handleClick = () => {
    setShowFormCreate(!showFormCreate)
  }
  useEffect(() => {
    AccountantService.getAccountant()
      .then(res => {
        const data = res.data;
        console.log(data)
        setAccountants(data.users)
      })
  }, [create, update, del]);
  const handleCreate = () => {
    setCreate(!create);

  }
  const handleUpdate = () => {
    setUpdate(!update);
  }


  const handleDelete = () => {
    if (check === []) {
      console.log("nothing on checked")

    }
    else {
      check.map((id) => {
        return AccountantService.deleteAccountant(id)
          .then(res => setDel(!del))
          .then(() => {
            showToast("Xóa nhân viên thành công", "success");
            history.push("/chief-accountant/user")
          })

      })

    }
  }
  const showToast = (message, type) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  };
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
            <div className="manageAccoutant-table_column">
              {/* <input className="checkAllAccountant" type="checkbox" checked={false} value=""/> */}
              <h5></h5>
              <h5>Tên nhân viên</h5>
              <h5>Số điện thoại</h5>
              <h5>Địa chỉ</h5>
              <h5>Ngày tạo</h5>

            </div>
            {accountants.map(account => {
              const { id, name, username, phoneNumber, address } = account;
              const createdAt = account.createdAt.toString().slice(0, 10)
              return <ListAccountant key={id} index={id} name={name} username={username} phone={phoneNumber} address={address} createdAt={createdAt}
                show={showFormUpdate} setShow={setShowFormUpdate} setIndex={setIndex}
                setAccountant={setAccountant} check={check} setCheck={setCheck} checkAll={checkAll} />

            })}
            <button className='btn' style={{ float: "right" }} onClick={handleDelete}>Xóa</button>

          </div>
        </div>
        <ToastifyToast />
      </div>


      {showFormUpdate && <FormAccountant title="Cập nhật nhân viên" action="Lưu" show={showFormUpdate} setShow={setShowFormUpdate} showToast={showToast} id={index} account={accountant} handleUpdate={handleUpdate} />}
      {showFormCreate && <FormAccountant title="Thêm nhân viên" action="Thêm" show={showFormCreate} setShow={setShowFormCreate} showToast={showToast} handleCreate={handleCreate} />}

    </>

  )
}



export default ManageAccountant;