import React from 'react'
import './RowReport.css'
function RowReport({date,amount,turnover,cost,profit}) {
    return (
        <div className="row-report" >
            <h3 className='row-report_item'>{date}</h3>
            <h3 className='row-report_item'>{amount}</h3>
            <h3 className='row-report_item'>{turnover}</h3>
            <h3 className='row-report_item'>{cost}</h3>
            <h3 className='row-report_item'>{profit}</h3>
    
        </div>
      )
}

export default RowReport