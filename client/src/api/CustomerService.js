import call_api from "./Request";

export const createCustomer = (customer) => {
  return call_api({
    url: "customers",
    method: "POST",
    data: customer
  });
}

export const searchCustomer = ({ query, page, size }) => {
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

const CustomerService = {
  createCustomer,
  searchCustomer
}

export default CustomerService;