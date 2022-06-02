import { createContext, useState, useContext } from "react";
import moment from "moment";

const SelectContext = createContext(null);
 
export const Provider = ({ children }) => {
  const [data, setData] = useState({
    type: 'Theo thời gian',
    time: 'Ngày',
    shape:'Biểu diễn dưới dạng bảng'
  })
  const [start,setStart] = useState(moment().subtract(29, "days")._d)
  const [end,setEnd] = useState(moment()._d)
  const [show,setShow] = useState(false)
  const receiveData = (option) => {
    setData(option)
  }
  const receiveStart = (startDate) => {
    setStart(startDate)
  }
  const receiveEnd = (endDate) => {
    setEnd(endDate)
  }
  const receiveShow= (show) => {
       setShow(show)
  }
  return (
    <SelectContext.Provider value={{ data, receiveData,start, receiveStart,end,receiveEnd,receiveShow,show}}>
      {children}
    </SelectContext.Provider>
  )

};
export const useSelect = () => {
  return useContext(SelectContext)
}
