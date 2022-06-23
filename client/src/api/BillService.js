import call_api from "./Request";

export const createBill = (bill) => {
  return call_api({
    url: "accountant/bills",
    method: "POST",
    data: bill
  });
}

export const searchBill = (params) => {
  return call_api({
    url: "accountant/bills/filter",
    method: "GET",
    params
  })
}

const getBill = (id) => {
  return call_api({
    method: "GET",
    url: `accountant/bills/${id}`
  })
}

const getDataBetween = (start, end) => {
  return call_api({
    method: "GET",
    url: `accountant/bills/${start}/${end}`,
  })
}

const updateBill = (id, bill) => {
  if (bill.modifiedAt) delete bill.modifiedAt;
  return call_api({
    method: "PUT",
    url: `accountant/bills/${id}`,
    data: bill
  })
}

const count = (params) => {
  return call_api({
    method: "GET",
    url: "accountant/bills/count-filter",
    params
  })
}

const BillService = {
  createBill,
  searchBill,
  count,
  updateBill,
  getBill,
  getDataBetween
}

export default BillService;