import call_api from "./Request";



const getAllAccountant = () => {
  return call_api({
    method: "GET",
    url: "chief-accountant/users"
   
  })
}
const getAccountant = (id) => {
  return call_api({
    method: "GET",
    url: `chief-accountant/users/${id}`
  })
}

const createAccountant = (accountant) => {
  return call_api({
    method: "POST",
    url: "chief-accountant/users",
    data: accountant
  })
}

const updateAccountant = (id, accountant) => {
  return call_api({
    method: "PUT",
    url: `chief-accountant/users/${id}`,
    data: accountant
  })
}
const deleteAccountant = (id) => {
  return call_api({
    method: "DELETE",
    url: `chief-accountant/users/${id}`
  })
}
 const searchAccountant = ({ query, page, size }) => {
  return call_api({
    url: "chief-accountant/users",
    method: "GET",
    params: {
      query,
      page,
      size
    }
  })
}
const count = (query) => {
  return call_api({
    method: "GET",
    url: "chief-accountant/users/count",
    params: {
      query
    }
  })
}



const AccountantService = {
  getAllAccountant,
   getAccountant,
  createAccountant,
  updateAccountant,
  deleteAccountant,
  count,
  searchAccountant
}

export default AccountantService;