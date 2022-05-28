import call_api from "./Request";



const getBillCategory = () => {
  return call_api({
    method: "GET",
    url: "chief-accountant/bill-categories"
  })
}

const createBillCategory = (category) => {
  return call_api({
    method: "POST",
    url: "",
    data: category
  })
}

const updateBillCategory = (id, category) => {
  if (category.modifiedAt) delete category.modifiedAt;
  return call_api({
    method: "PUT",
    url: `admin/categories/${id}`,
    data: category
  })
}


const BillCategoryService = {
   getBillCategory,
  createBillCategory,
  updateBillCategory,
}

export default BillCategoryService;