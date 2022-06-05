import call_api from "./Request";

export const createBill = (bill) => {
  return call_api({
    url: "accountant/bills",
    method: "POST",
    data: bill
  });
}

export const searchBill = ({ query, page, size }) => {
  return call_api({
    url: "accountant/bills",
    method: "GET",
    params: {
      query,
      page,
      size
    }
  })
}

const getBill = (id) => {
  return call_api({
    method: "GET",
    url: `accountant/bills/${id}`
  })
}
const getDataBetween =(start,end)=>{
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

const count = (query) => {
  return call_api({
    method: "GET",
    url: "accountant/bills/count",
    params: {
      query
    }
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