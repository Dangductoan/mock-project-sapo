import call_api from "./Request";

const searchCustomer = ({ query, page, size }) => {
  return call_api({
    url: "customers",
    method: "GET",
    params: {
      query,
      page,
      size
    }
  })
}

const getCustomer = () => {
  return call_api({
    method: "GET",
    url:"chief-accountant/customer"
  })
}

const createCustomer = (Customer) => {
  return call_api({
    method: "POST",
    url: "chief-accountant/customer",
    data: Customer
  })
}

const updateCustomer = (id, Customer) => {
  return call_api({
    method: "PUT",
    url: `chief-accountant/customer/${id}`,
    data: Customer
  })
}


const CustomerService = {
  getCustomer,
  createCustomer,
  updateCustomer,
  searchCustomer
}

export default CustomerService;