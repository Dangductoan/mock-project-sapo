import React,{useState,useEffect} from 'react'
import CustomerService from '../../../api/CustomerService';
function SelectCustomer({filterOption,setFilterOption}) {
  const [customers, setCustomers] = useState([]);
  const handleChange = (e) => {
    setFilterOption({...filterOption,customerId:e.target.value})
  }
  useEffect(() => {
    CustomerService.getAllCustomer()
      .then((res) => setCustomers(res.data?.customers))
      .catch((err) => console.log(err));
  }, []);
  return (
    <select
    className="bill-input bill-input_select "
    name="billCategoryName"
    onChange={handleChange}
  >
    <option value="">Chọn khách hàng</option>
    {customers.map((customer) => (
      <option key={customer.id} value={customer.id}>
        {customer.name}
      </option>
    ))}
  </select>
  )
}

export default SelectCustomer