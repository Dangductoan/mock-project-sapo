import React, { useState } from 'react'
import './Form.css'
import CustomerService from '../../api/CustomerService'
function FormCustomer({ title, action, show, setShow, id , cus,handleCreate,handleUpdate }) {
    const [type,setType]=useState(action === "Thêm"?true:false)
    const [customer, setCustomer] = useState(action === 'Thêm'?{
        code:"",
        name:"",
        phoneNumber:"",
        groupCustomer:"",
        createdBy:"",
        address:""
       
  
    }:
    {
        code:cus.code,
        name:cus.name,
        phoneNumber:cus.phoneNumber,
        groupCustomer:cus.groupCustomer,
        createdBy:cus.createdBy,
        address:cus.address
   
  
    }
    )
    const customerForUpdate = {id:id,...customer}
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
      
        if(action === 'Thêm') {
            CustomerService.createCustomer(customer).then(res=>handleCreate())

        } else {
            CustomerService.updateCustomer(id, customerForUpdate).then(res=>handleUpdate())

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
                       {type && <> <label htmlFor="">Mã khách hàng</label><br></br>
                        <input onChange={handleChange} name="code" value={customer.code} type="text"  />   </>}

                        <label htmlFor="">Tên khách hàng*</label><br></br>
                        <input onChange={handleChange} name="name" value={customer.name} type="text" />

                        <label htmlFor="">Số điện thoại</label><br></br>
                        <input onChange={handleChange} name="phoneNumber" value={customer.phoneNumber} type="text" />

                        <label htmlFor="">Nhóm khách hàng</label><br></br>
                        <input onChange={handleChange} name="groupCustomer" value={customer.groupCustomer} type="text" />

                        <label htmlFor="">Nhân viên phụ trách</label><br></br>
                        <input onChange={handleChange} name="createdBy" value={customer.createdBy} type="text" />

                        <label htmlFor="">Địa chỉ</label><br></br>
                        <input onChange={handleChange} name="address" value={customer.address} type="text" />
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

export default FormCustomer