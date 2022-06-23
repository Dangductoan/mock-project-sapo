
const date = (data) => {
    const newData = data === undefined ? [] : data.map((revenue) => {
       
        const date = revenue.date.toString().slice(0, 10)
        return { ...revenue, date: date, }
    })
    const rowTotal = data !== undefined && data.reduce((d, v) => {
        d.billQuantity = d.billQuantity + v.billQuantity;
        d.totalRevenue = d.totalRevenue + v.totalRevenue;
       
        return d;

    }, {
        totalRevenue: 0,
        billQuantity: 0,
        date: ''
    })
    const excelData = [rowTotal, ...newData]
    return excelData
}
const monthAndYear = (data, revenues) => {
    const newData = Object.keys(data).map((key) => {
        return data[key].reduce((d, v) => {
            d.billQuantity = d.billQuantity + v.billQuantity;
            d.totalRevenue = d.totalRevenue + v.totalRevenue;
            return d;
        }, {
            billQuantity: 0,
            totalRevenue: 0,
            date: key,
          
        })
    })
    const rowTotal = revenues !== undefined && revenues.reduce((d, v) => {
        d.billQuantity = d.billQuantity + v.billQuantity;
        d.totalRevenue = d.totalRevenue + v.totalRevenue;
       
        return d;

    }, {
        totalRevenue: 0,
        billQuantity: 0,
        date: ''
    })
    const excelDataMonth = [rowTotal, ...newData]
    return excelDataMonth
}

const ConvertDataToExport = {
    date, monthAndYear
}
export default ConvertDataToExport;