import React, { useState, useEffect, useRef } from 'react'
import './Form.css'
import AccountantService from '../../api/AccountantService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function FormAccountant({ title, action, show, setShow, id , account,handleCreate,handleUpdate,showToast }) {
    const history = useHistory;
    const errorValit = useRef({})
    const [render,setRender] = useState(false)
    const [type,setType]=useState(action === "Thêm"?true:false)

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
        console.log(accountant)
        console.log(accountant['name'])

    }
    
   const handleValidation = ()=>{
        let errors = {};
        let formIsValid = true;
    
        //Requir fields
        if(!accountant["name"]){
          formIsValid = false;
          errors["name"] = "Không được để trống";
        }
        if(!accountant["username"]){
            formIsValid = false;
            errors["username"] = "Không được để trống";
          }
          if(type){
            if(!accountant["password"]){
                formIsValid = false;
                errors["password"] = "Không được để trống";
              }
        
          }
         
          if(!accountant["phoneNumber"]){
            formIsValid = false;
            errors["phoneNumber"] = "Không được để trống";
          }
    
          
    
        if(typeof accountant["username"] !== "undefined"){
          if(!accountant["username"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["username"] = "Chỉ chứa kí tự chữ ";
          }      	
        }
    
        
        if(typeof accountant["phoneNumber"] !== "undefined"){
            if(!accountant["phoneNumber"].match(/^\d{10}$/)){
              formIsValid = false;
              errors["phoneNumber"] = "Chỉ chứa số và 10 kí tự ";
            }      	
          }
          errorValit.current=errors
          return formIsValid;
      }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(handleValidation()){
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
                        <label htmlFor="">Tên</label><br></br>
                        <input onChange={handleChange} name="name" value={accountant.name} type="text"  />
                        <div className="error" >{errorValit.current["name"]}</div>


                        <label htmlFor="">Tên đăng nhập</label><br></br>
                        <input onChange={handleChange} name="username" value={accountant.username} type="text" />
                        <div className="error" >{errorValit.current["username"]}</div>


                        <label htmlFor="">Mật khẩu</label><br></br>
                        <input onChange={handleChange} name="password" value={accountant.password} type="password" />
                        <div className="error" >{errorValit.current["password"]}</div>


                        <label htmlFor="">Số điện thoại</label><br></br>
                        <input onChange={handleChange} name="phoneNumber" value={accountant.phoneNumber} type="text" />
                        <div className="error" >{errorValit.current["phoneNumber"]}</div>


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