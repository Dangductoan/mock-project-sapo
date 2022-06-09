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
          <button style={{margin:"40px 0"}}className="btn"type='button' onClick={download}>
          <svg className="MuiSvgIcon-root" style={{width:'10px'}} focusable="false" viewBox="0 0 14 20" aria-hidden="true"><path d="M6 8.74228e-08L6 12.17L2.41 8.59L1 10L7 16L13 10L11.59 8.59L8 12.17L8 0L6 8.74228e-08Z" fill="currentColor"></path><path d="M0 18H14V20H0V18Z" fill="currentColor"></path></svg>
            Download image</button>
      </div>
  )
}

export default LineChart