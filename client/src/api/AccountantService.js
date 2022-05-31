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
    url: `chief/${id}`,
    data: accountant
  })
}


const AccountantService = {
   getAccountant,
  createAccountant,
  updateAccountant,
}

export default AccountantService;