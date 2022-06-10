import React,{useRef,useCallback} from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from  'chart.js/auto'
function BarChart({chartData}) {
  const ref = useRef(null)
  const download = useCallback(() => {
    const link = document.createElement('a')
    link.download = 'chart.png'
    link.href = ref.current.toBase64Image();
    link.click()
  },[])
  return (
      <div style={{width:800,margin:'20px 0 20px 80px',textAlign:"center"}}>
          <Bar ref={ref} data={chartData}/>
        

      </div>
  )
}

export default BarChart