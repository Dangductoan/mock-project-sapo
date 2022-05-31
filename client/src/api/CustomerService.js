import call_api from "./Request";



const getCustomer = () => {
  return call_api({
    method: "GET",
    // url: "chief-Customer/user"
    url:"customers/"
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
}

export default CustomerService;