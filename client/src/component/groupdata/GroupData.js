
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

const GroupData = {
    GroupDataForMonth,
    GroupDataForYear
 }
 export default GroupData;


