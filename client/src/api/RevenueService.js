 import call_api from "./Request";

const getDataBetween =(start,end)=>{
    return call_api({
        method: "GET",
        url: `chief-accountant/revenue-stats/${start}/${end}`,
      })
}

const RevenueService = {
    getDataBetween
 }
 export default RevenueService;