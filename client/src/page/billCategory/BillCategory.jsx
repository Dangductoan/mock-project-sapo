import React,{useEffect,useState} from 'react'
import Row from '../../component/row/Row'
import BillCategoryService from '../../api/BillCategoryService'
import './billCategory.css'
function BillCategory() {
  const [billCategories,setBillCategories] = useState([])
  
  useEffect(() => {
     BillCategoryService.getBillCategory()
      .then(res =>{
        const data = res.data;
        setBillCategories(data)
      } )
    },[])
    console.log(billCategories)
  return (
    <div className="billCategory">
       <div className="billCategory-header">
           <h2 className="billCategory-title">
             Loại Phiếu Thu
           </h2>
           <div className="billCategory-btn ">
             <button className='btn'>Thêm Loại phiếu thu</button>
           </div>
       </div>
       <div className="billCategory-content">
            <div className="billCategory-table">
               <div className="column">
                 <h5>Tên</h5>
                 <h5>Mã</h5>
                 <h5>Mô tả</h5>

               </div>
              {billCategories.map(BillCategory => {
                const {name,code,description,id} =  BillCategory;
                return <Row key={id} name={name} code={code} desc={description}/>
                
              })}

            </div>
       </div>
    </div>
  )
}

export default BillCategory