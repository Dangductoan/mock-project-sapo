import call_api from "./Request";

const searchCustomer = ({ query, page, size }) => {
  return call_api({
    url: "accountant/customers",
    method: "GET",
    params: {
      query,
      page,
      size
    }
  })
}

const getCustomer = (id) => {
  return call_api({
    method: "GET",
    url:`accountant/customers/${id}`,
  })
}

const createCustomer = (Customer) => {
  return call_api({
    method: "POST",
    url: "accountant/customers",
    data: Customer
  })
}

const updateCustomer = (id, Customer) => {
  return call_api({
    method: "PUT",
    url: `accountant/customers/${id}`,
    data: Customer
  })
}
const deleteCustomer = (id) => {
  return call_api({
    method: "DELETE",
    url: `accountant/customers/${id}`
  })
}
const count = (query) => {
  return call_api({
    method: "GET",
    url: "accountant/customers/count",
    params: {
      query
    }
  })
}

const CustomerService = {
  getCustomer,
  createCustomer,
  updateCustomer,
  searchCustomer,
  deleteCustomer,
  count
}

export default CustomerService;