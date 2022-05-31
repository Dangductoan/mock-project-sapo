import call_api from "./Request";



const getAccountant = () => {
  return call_api({
    method: "GET",
    // url: "chief-accountant/user"
    url:"chief/"
  })
}

const createAccountant = (accountant) => {
  return call_api({
    method: "POST",
    url: "chief-accountant/user/",
    data: accountant
  })
}

const updateAccountant = (id, accountant) => {
  return call_api({
    method: "PUT",
    url: `chief-accountant/user/${id}`,
    data: accountant
  })
}
const deleteAccountant = (id) => {
  return call_api({
    method: "DELETE",
    url: `chief/${id}`
  })
}


const AccountantService = {
   getAccountant,
  createAccountant,
  updateAccountant,
  deleteAccountant
}

export default AccountantService;