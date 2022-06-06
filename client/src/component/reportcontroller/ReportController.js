import { useEffect,useState} from 'react'
import { useSelect } from '../../context/Provider'
import RevenueService from '../../api/RevenueService';
import BillService from '../../api/BillService';
const GetData = () => {
  const cd = useSelect()
  const formatYmd = date => date.toISOString().slice(0, 10);
  const start = formatYmd(cd.start)
  const end = formatYmd(cd.end)
  const [data,setData] = useState()
  useEffect(() => {
    RevenueService.getDataBetween(start, end)
      .then(res => {
        const data = res.data
        setData(data)
      })

  }, [start, end, cd])
  return (
    data
  )
}
const GetBillBetween= () => {
  const cd = useSelect()
  const formatYmd = date => date.toISOString().slice(0, 10);
  const start = formatYmd(cd.start)
  const end = formatYmd(cd.end)
  const [data,setData] = useState()
  useEffect(() => {
    BillService.getDataBetween(start, end)
      .then(res => {
        const data = res.data
        setData(data)
      })

  }, [start, end, cd])
  return (
    data
  )
}

const ReportController = {
  GetData,
  GetBillBetween
}
export default ReportController