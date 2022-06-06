import React, { useState } from 'react'
import './Form.css'
import AccountantService from '../../api/AccountantService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function FormAccountant({ title, action, show, setShow, id , account,handleCreate,handleUpdate,showToast }) {
    const history = useHistory;
    const [accountant, setAccountant] = useState(action === 'Thêm'?{
        name:'',
        username: '',
        password: '',
        phoneNumber: '',
        address:''
    }:
    {
        name:account.name,
        username:account.username,
        password: '',
        phoneNumber:account.phoneNumber,
        address:account.address
    }
    );
   
    const accountantForUpdate = {id:id,...accountant}
    const handleChange = (e) => {
        setAccountant({ ...accountant, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
      
        if(action === 'Thêm') {
            AccountantService.createAccountant(accountant).then(res=>handleCreate()).then(()=>{
                showToast("Thêm nhân viên thành công", "success");
                history.push("/chief-accountant/user")
            }).catch(({ response }) => {
                showToast(response.data?.error?.message, "error");
              });

        } else {
            AccountantService.updateAccountant(id, accountantForUpdate).then(res=>handleUpdate()).then(()=>{
                showToast("Cập nhật nhân viên thành công", "success");
                history.push("/chief-accountant/user");
            }).catch(({ response }) => {
                showToast(response.data?.error?.message, "error");
              });

        }          
      
        setShow(!show)
    }
    const handleClick = () => {
        setShow(!show)
    }
 
    return (
        <>
            <div className="modal">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-title">
                        <h3>{title}</h3>
                        <span onClick={handleClick}>X</span>
                    </div>
                    <div className="form-content">
                        <label htmlFor="">Tên*</label><br></br>
                        <input onChange={handleChange} name="name" value={accountant.name} type="text"  />

                        <label htmlFor="">Tên đăng nhập*</label><br></br>
                        <input onChange={handleChange} name="username" value={accountant.username} type="text" />

                        <label htmlFor="">Mật khẩu*</label><br></br>
                        <input onChange={handleChange} name="password" value={accountant.password} type="password" />

                        <label htmlFor="">Số điện thoại</label><br></br>
                        <input onChange={handleChange} name="phoneNumber" value={accountant.phoneNumber} type="text" />

                        <label htmlFor="">Địa chỉ</label><br></br>
                        <input onChange={handleChange} name="address" value={accountant.address} type="text" />
                    </div>
                    <div className="form-btn">
                        <button className='btn btn-no-active' onClick={handleClick}>Thoát</button>
                        <button className='btn' >{action}</button>
                    </div>
                </form>

            </div>

            <div className="overlay"></div>


        </>
    )
}

export default FormAccountant