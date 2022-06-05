import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from  'chart.js/auto'
function LineChart({chartData}) {
  return (
      <div style={{width:800,margin:'20px 0 20px 80px'}}>
          <Line data={chartData}/>

      </div>
  )
}

export default LineChart