import React from 'react'

function SelectPaymentMethodId({filterOption,setFilterOption}) {
  const handleChange = (e) => {
    setFilterOption({...filterOption,payment:e.target.value})
  }
  return (
    <select
    className="bill-input bill-input_select"
    name="payment"
    onChange={handleChange}
  >
    <option value="">Chọn hình thức thanh toán</option>
    <option value="Tiền mặt">Tiền mặt</option>
    <option value="Quẹt thẻ">Quẹt thẻ</option>
    <option value="Chuyển khoản">Chuyển khoản</option>
  </select>
  )
}

export default SelectPaymentMethodId