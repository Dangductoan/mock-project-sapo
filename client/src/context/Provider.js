import { createContext, useState, useContext } from "react";
import moment from "moment";

const SelectContext = createContext(null);
 
export const Provider = ({ children }) => {
  const [data, setData] = useState({
    type: 'Theo thời gian',
    time: 'Ngày',
    
  })
  const [start,setStart] = useState(moment().subtract(29, "days")._d)
  const [end,setEnd] = useState(moment()._d)
  const receiveData = (option) => {
    setData(option)
  }
  const receiveStart = (startDate) => {
    setStart(startDate)
  }
  const receiveEnd = (endDate) => {
    setEnd(endDate)
  }
  return (
    <SelectContext.Provider value={{ data, receiveData,start, receiveStart,end,receiveEnd}}>
      {children}
    </SelectContext.Provider>
  )

};
export const useSelect = () => {
  return useContext(SelectContext)
}
