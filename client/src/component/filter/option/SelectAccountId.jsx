import React,{useState,useEffect} from 'react'
import AccountantService from '../../../api/AccountantService';

function SelectAccountId({filterOption,setFilterOption}) {
  const [accountants,setAccountants] = useState([])
  const handleChange = (e) => {
    setFilterOption({...filterOption,createdBy:e.target.value})
  }
  useEffect(() => {
    AccountantService.getAllAccountant()
      .then((res) => {
        setAccountants(res.data.users);
      })
      .catch((err) => console.log(err));
    
  }, []);
  return (
    <select
    className="bill-input bill-input_select "
    name="billCategoryName"
    onChange={handleChange}
  >
    <option value="">Chọn người tạo</option>
    {accountants.map((accountant) => (
      <option value={accountant.name}>
        {accountant.name}
      </option>
    ))}
  </select>
  )
}

export default SelectAccountId