import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from  'chart.js/auto'
function BarChart({chartData}) {
  return (
      <div style={{width:800,margin:'20px 0 20px 80px'}}>
          <Bar data={chartData}/>

      </div>
  )
}

export default BarChart