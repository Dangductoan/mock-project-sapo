
import _ from 'underscore';

const GroupDataForMonth =(data)=>{

    return _.groupBy(data, function(item) {
        return item.date.substring(0,7);
    });
}
const GroupDataForYear =(data)=>{
    return _.groupBy(data, function(item) {
        return item.date.substring(0,4);
    });
}
const GroupDataForCustomerId = (data) => {
    return _.groupBy(data,function(item) {
        return item.customer.id;
    })
}
const GroupDataForBillCategoryId = (data) => {
    return _.groupBy(data,function(item) {
        return item.billCategory.id;
    })
}
const GroupDataForCreatedBy = (data) => {
    return _.groupBy(data,function(item) {
        return item.createdBy;
    })
}
const GroupData = {
    GroupDataForMonth,
    GroupDataForYear,
    GroupDataForCustomerId,
    GroupDataForBillCategoryId,
    GroupDataForCreatedBy
 }
 export default GroupData;


