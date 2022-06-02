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
    // url: "chief-Customer/user"
    url: "customers/"
  })
}

const createCustomer = (Customer) => {
  return call_api({
    method: "POST",
    url: "customers/",
    data: Customer
  })
}

const updateCustomer = (id, Customer) => {
  return call_api({
    method: "PUT",
    url: `customers/${id}`,
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