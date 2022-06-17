import React,{useState,useEffect} from 'react'
import BillCategoryService from '../../../api/BillCategoryService';
function SelectGroupId({filterOption,setFilterOption}) {
  const [billCategories, setBillCategories] = useState([]);
  const handleChange = (e) => {
    setFilterOption({...filterOption,billCategoryId:e.target.value})
  }
  useEffect(() => {
    BillCategoryService.getBillCategory()
      .then((res) => {
        setBillCategories(res.data);
      })
      .catch((err) => console.log(err));
    
  }, []);
  return (
    <select
    className="bill-input"
    name="billCategoryName"
    onChange={handleChange}
  >
    <option value="">Chọn loại phiếu thu</option>
    {billCategories.map((billCategory) => (
      <option value={billCategory.id}>
        {billCategory.name}
      </option>
    ))}
  </select>
  )
}

export default SelectGroupId