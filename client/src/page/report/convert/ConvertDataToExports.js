
const date = (data) => {
    const newData = data === undefined ? [] : data.map((revenue) => {
        const { totalRevenue } = revenue;
        const cost = 0;
        const profit = totalRevenue - 0;
        const date = revenue.date.toString().slice(0, 10)
        return { ...revenue, cost: cost, date: date, profit: profit }
    })
    const rowTotal = data !== undefined && data.reduce((d, v) => {
        d.billQuantity = d.billQuantity + v.billQuantity;
        d.totalRevenue = d.totalRevenue + v.totalRevenue;
        d.profit = d.totalRevenue - d.cost;
        return d;

    }, {
        totalRevenue: 0,
        billQuantity: 0,
        cost: 0,
        profit: 0,
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
            cost: 0,
            profit: 0,
        })
    })
    const rowTotal = revenues !== undefined && revenues.reduce((d, v) => {
        d.billQuantity = d.billQuantity + v.billQuantity;
        d.totalRevenue = d.totalRevenue + v.totalRevenue;
        d.profit = d.totalRevenue - d.cost;
        return d;

    }, {
        totalRevenue: 0,
        billQuantity: 0,
        cost: 0,
        profit: 0,
        date: ''
    })
    const excelDataMonth = [rowTotal, ...newData]
    return excelDataMonth
}

const ConvertDataToExport = {
    date, monthAndYear
}
export default ConvertDataToExport;