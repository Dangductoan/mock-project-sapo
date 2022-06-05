import React, { useState } from 'react'
import './Form.css'
import BillCategoryService from '../../api/BillCategoryService'
function Form({ title, action, show, setShow, id,handleUpdate,handleCreate,bl,showToast}) {
    const [billCategory, setBillCategory] = useState(action === 'Thêm' ? {
        name: '',
        code: '',
        description: ''
    } : {
        name: bl.name,
        code: bl.code,
        description: bl.desc
    })
    const billCategoryForUpdate = {id:id,...billCategory}
    const handleChange = (e) => {
        setBillCategory({ ...billCategory, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
      
        if(action === 'Thêm') {
            BillCategoryService.createBillCategory(billCategory) 
                .then(res => handleCreate())
                .then(() => {
                    showToast("Thêm loại phiếu thu thành công", "success");
                })
                .catch(({ response }) => {
                    showToast(response.data?.error?.message, "error");
                  });
        } else {
            BillCategoryService.updateBillCategory(id, billCategoryForUpdate)
                .then(res => handleUpdate())
                .then(() => {
                    showToast("Cập nhât loại phiếu thu thành công", "success");
                })
                .catch(({ response }) => {
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
                        <input onChange={handleChange} name="name" value={billCategory.name} type="text" />

                        <label htmlFor="">Mã</label><br></br>
                        <input onChange={handleChange} name="code" value={billCategory.code} type="text" />

                        <label htmlFor="">Mô tả</label><br></br>
                        <input onChange={handleChange} name="description" value={billCategory.description} type="text" />
                    </div>
                    <div className="form-btn">
                        <button className='btn btn-no-active' onClick={handleClick}>Thoát</button>
                        <button className='btn'>{action}</button>
                    </div>
                </form>

            </div>

            <div className="overlay"></div>


        </>
    )
}

export default Form