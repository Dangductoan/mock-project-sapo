import React, { useState } from 'react'
import "./Filter.css"
import FilterItem from './FilterItem'
import { useSelect } from '../../context/Provider'
function Filter({ searchParams, setSearchParams }) {
  const cd = useSelect()
  const [show, setShow] = useState(false)
  const [option, setOption] = useState([])
  const [filterOption, setFilterOption] = useState({
    customerId: null,
    billCategoryId: null,
    payment: "",
    start: "",
    end: "",
    createdBy: "",
  })
 
  const handleClick = () => {
    setShow(!show)
  }
  const isOption = (par) => {
    return option.indexOf(par)
  }
  const handleChange = (e) => {
    setOption([...option, e.target.value]);
  }
  const start = isOption('issuedOn') !== -1 &&  new Date(cd.start.getTime() - (cd.start.getTimezoneOffset() * 60000 ))
  .toISOString()
  .split("T")[0];;
  const end = isOption('issuedOn') !== -1 &&  new Date(cd.end.getTime() - (cd.end.getTimezoneOffset() * 60000 ))
  .toISOString()
  .split("T")[0];
  console.log(start,end)
  const handleFilter = () => {
    setSearchParams({ ...searchParams, ...filterOption ,start:start,end:end})
    
  }

  return (
    <div className='filter'>
      <div className="filter-controller">
        <button className='btn-filter' type="button" onClick={handleClick}>
          <span>Lọc phiếu thu</span>
          <svg style={{ fill: 'black' }} class="MuiSvgIcon-root filter-btn_icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>
        </button>
      </div>
      <div className={`filter-body  ${show ? 'block' : ''}`}>
        <p className='filter-title'>Hiển thị khách hầng theo:</p>
        {isOption('customer') !== -1 && <FilterItem name="Khách hàng" type="customer" option={option} setOption={setOption} filterOption={filterOption} setFilterOption={setFilterOption} />}
        {isOption('paymentMethodId') !== -1 && <FilterItem name="Hình thức thanh toán" type="paymentMethodId" option={option} setOption={setOption} filterOption={filterOption} setFilterOption={setFilterOption} />}
        {isOption('groupId') !== -1 && <FilterItem name="Loai phiếu" type="groupId" option={option} setOption={setOption} filterOption={filterOption} setFilterOption={setFilterOption} />}
        {isOption('accountId') !== -1 && <FilterItem name="Người tạo" type="accountId" option={option} setOption={setOption} filterOption={filterOption} setFilterOption={setFilterOption} />}
        {isOption('issuedOn') !== -1 && <FilterItem name="Người tạo" type="issuedOn" option={option} setOption={setOption} filterOption={filterOption} setFilterOption={setFilterOption} />}


        <div className="filter-select">
          <select className="filter-select-all" onChange={handleChange}>
            <option value="">Chọn điều kiện lọc</option>
            <option value="customer">Khách hàng</option>
            <option value="paymentMethodId">Hình thức thanh toán</option>
            <option value="groupId">Loại phiếu</option>
            <option value="accountId">Người tạo</option>
            <option value="issuedOn">Ngày ghi nhận</option>
          </select>
        </div>
        <div className="filter-btn">
          <button className='btn' onClick={handleFilter}>Lọc</button>
        </div>
      </div>
    </div>
  )
}

export default Filter