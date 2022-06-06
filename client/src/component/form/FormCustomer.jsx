import React, { useState,useRef, useEffect } from 'react'
import './Form.css'
import CustomerService from '../../api/CustomerService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function FormCustomer({ title, action, show, setShow, id , cus,handleCreate,handleUpdate,showToast}) {
    const history = useHistory;
    const errorValit = useRef({})
    const [render,setRender] = useState(false)
    const [type,setType]=useState(action === "Thêm"?true:false)
    const [customer, setCustomer] = useState(action === 'Thêm'?{
        code:"",
        name:"",
        phoneNumber:"",
        groupCustomer:"",
        createdBy:"",
        address:"",
        email:""
       
  
    }:
    {
        code:cus.code,
        name:cus.name,
        phoneNumber:cus.phoneNumber,
        groupCustomer:cus.groupCustomer,
        createdBy:cus.createdBy,
        address:cus.address,
        email:cus.email
   
  
    }
    )
    const customerForUpdate = {id:id,...customer}
    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }
    const handleValidation = ()=>{
        let errors = {};
        let formIsValid = true;
    
        //Requir fields
        if(!customer["name"]){
          formIsValid = false;
          errors["name"] = "Không được để trống";
        }
        if(!customer["code"]){
            formIsValid = false;
            errors["code"] = "Không được để trống";
          }
         
          if(!customer["email"]){
            formIsValid = false;
            errors["email"] = "Không được để trống";
          }
          if(!customer["phoneNumber"]){
            formIsValid = false;
            errors["phoneNumber"] = "Không được để trống";
          }
    
          errorValit.current=errors
          return formIsValid;
      }
    const handleSubmit = (e) => {
     
        e.preventDefault()
        if(handleValidation()){
        if(action === 'Thêm') {
            CustomerService.createCustomer(customer).then(res=>handleCreate()).then(()=>{
                showToast("Thêm khách hàng thành công", "success");
                history.push("/chief-accountant/customer")
            }).catch(({ response }) => {
                showToast(response.data?.error?.message, "error");
              });

        } else {
            CustomerService.updateCustomer(id, customerForUpdate).then(res=>handleUpdate()).then(()=>{
                showToast("Cập nhật khách hàng thành công", "success");
                history.push("/chief-accountant/customer");
            }).catch(({ response }) => {
                showToast(response.data?.error?.message, "error");
              });

        }          
      
        setShow(!show)
    }
    else{
        alert("Form has errors.")
        setRender(true);
        
    }
 
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
                    {type && 
                        <> <label htmlFor="">Mã khách hàng</label><br></br>
                        <input onChange={handleChange} name="code" value={customer.code} type="text"  /> 
                        <div className="error" >{errorValit.current["code"]}</div>

                     </>}

                        <label htmlFor="">Tên khách hàng*</label><br></br>
                        <input onChange={handleChange} name="name" value={customer.name} type="text" />
                        <div className="error" >{errorValit.current["name"]}</div>

                        <label htmlFor="">Số điện thoại</label><br></br>
                        <input onChange={handleChange} name="phoneNumber" value={customer.phoneNumber} type="text" />
                        <div className="error" >{errorValit.current["phoneNumber"]}</div>

                        <label htmlFor="">Nhóm khách hàng</label><br></br>
                        <input onChange={handleChange} name="groupCustomer" value={customer.groupCustomer} type="text" />

                        <label htmlFor="">Nhân viên phụ trách</label><br></br>
                        <input onChange={handleChange} name="createdBy" value={customer.createdBy} type="text" />
                        <div className="error" >{errorValit.current["createdBy"]}</div>

                        <label htmlFor="">Email</label><br></br>
                        <input onChange={handleChange} name="email" value={customer.email} type="text" />
                        <div className="error" >{errorValit.current["email"]}</div>


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