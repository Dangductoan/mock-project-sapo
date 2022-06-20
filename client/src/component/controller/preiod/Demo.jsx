import React, { useState,useEffect } from "react";
import { useSelect } from "../../../context/Provider";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
export default function Demo({handleDateRanger}) {
  const cd = useSelect()
  const [fromDate, setFromDate] = useState(cd.start);
  const [toDate, setToDate] = useState(cd.end);
  
   
    

  // const range = {
  //   Today: [moment(), moment()],
  //   Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
  //   "Last 7 Days": [moment().subtract(6, "days"), moment()],
  //   "Last 30 Days": [moment().subtract(29, "days"), moment()],
  //   "This Month": [moment().startOf("month"), moment().endOf("month")],
  //   "Last Month": [
  //     moment()
  //       .subtract(1, "month")
  //       .startOf("month"),
  //     moment()
  //       .subtract(1, "month")
  //       .endOf("month")
  //   ],
  //   "Last Year": [
  //     moment()
  //       .subtract(1, "year")
  //       .startOf("year"),
  //     moment()
  //       .subtract(1, "year")
  //       .endOf("year")
  //   ]
  // };
  const style = {
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    width: "220px",
    lineHeight: "30px",
    height:'30px',
    backgroundColor:'#fff',
    padding:'0 15px',
    marginLeft:'5px',
    
  };

  
  const onApply = (event, picker) => {
    setFromDate(picker.startDate._d);
    setToDate(picker.endDate._d);
    // handleDateRanger();
  };
  
  useEffect(() => {
    cd.receiveStart(fromDate)

  },[cd,fromDate])
  useEffect(() => {
    cd.receiveEnd(toDate)

  },[cd,toDate])
   //object(fromDate,toDate) có các phương thức như getDay(),getYear()...

  return (
    <div className="App">
      <DateRangePicker
        startDate={fromDate}
        endDate={toDate}
        alwaysShowCalendars={true}
        onApply={onApply}
      >
        <div style={style} >
          {moment(fromDate).format("YYYY/MM/DD")} - {moment(toDate).format("YYYY/MM/DD")}
        </div>
        
      </DateRangePicker>
    </div>
  );
}
