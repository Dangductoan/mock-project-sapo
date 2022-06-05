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

const getCustomer = () => {
  return call_api({
    method: "GET",
    url:"accountant/customers"
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
    url: `accountant/customer/${id}`
  })
}


const CustomerService = {
  getCustomer,
  createCustomer,
  updateCustomer,
  searchCustomer,
  deleteCustomer
}

export default CustomerService;