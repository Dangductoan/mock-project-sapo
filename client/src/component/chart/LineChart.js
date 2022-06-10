import React,{useCallback,useRef} from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from  'chart.js/auto'
function LineChart({chartData}) {
  const ref = useRef(null)
  const download = useCallback(() => {
    const link = document.createElement('a')
    link.download = 'chart.png'
    link.href = ref.current.toBase64Image();
    link.click()
  },[])
  return (
      <div style={{width:800,margin:'20px 0 20px 80px',textAlign:"center"}}>
          <Line ref={ref} data={chartData}/>
         
      </div>
  )
}

export default LineChart