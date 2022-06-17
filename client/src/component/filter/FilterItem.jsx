import React from 'react'
import "./FilterItem.css"
import DeleteIcon from '@mui/icons-material/Delete';
import SelectCustomer from './option/SelectCustomer';
import SelectGroupId from './option/SelectGroupId';
import SelectPaymentMethodId from './option/SelectPaymentMethodId';
import SelectAccountId from './option/SelectAccountId';
import SelectIssuedOn from './option/SelectIssuedOn';
function FilterItem({name,type,option,setOption,filterOption,setFilterOption}) {
  const handleClick = () => {
    const id = option.indexOf(type);
    const newOption = [...option];
    newOption.splice(id,1)
    setOption(newOption);
    type === "customer" && setFilterOption({...filterOption,customerId:null})
    type === "groupId" && setFilterOption({...filterOption,billCategoryId:null})
    type === "paymentMethodId" && setFilterOption({...filterOption,payment:''})
    type === "accountId" && setFilterOption({...filterOption,createdBy:''})
    type === "issuedOn" && setFilterOption({...filterOption,start:'',end:''})

  }
  return (
    <div className="filter-item">
        <div className="filter-item_title">
             {name}
        </div>
        <div className="filter-item_option">
         {type==="issuedOn" && <SelectIssuedOn filterOption={filterOption} setFilterOption={setFilterOption}/>}
         {type==="customer" && <SelectCustomer filterOption={filterOption} setFilterOption={setFilterOption}/>}
         {type==="groupId" && <SelectGroupId filterOption={filterOption} setFilterOption={setFilterOption}/>}
         {type==="paymentMethodId" && <SelectPaymentMethodId filterOption={filterOption} setFilterOption={setFilterOption}/>}
         {type==="accountId" && <SelectAccountId filterOption={filterOption} setFilterOption={setFilterOption}/>}

        </div>
        <div className="filter-item_remove" onClick={handleClick}>
        <DeleteIcon/>
        </div>
    </div>
  )
}

export default FilterItem