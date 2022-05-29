import call_api from "./Request";



const getBillCategory = () => {
  return call_api({
    method: "GET",
    url: "chief-accountant/bill-categories"
  })
}

const createBillCategory = (billCategory) => {
  return call_api({
    method: "POST",
    url: "chief-accountant/bill-categories/insert",
    data: billCategory
  })
}

const updateBillCategory = (id, billCategory) => {
  return call_api({
    method: "PUT",
    url: `chief-accountant/bill-categories/${id}`,
    data: billCategory
  })
}


const BillCategoryService = {
   getBillCategory,
  createBillCategory,
  updateBillCategory,
}

export default BillCategoryService;