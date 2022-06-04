import React from 'react'
import './RowReport.css'
function RowReport(props) {
    return (
        <div className="row-report" >
            <h3 className='row-report_item'>{props.date}</h3>
            <h3 className='row-report_item'>{props.amount}</h3>
            <h3 className='row-report_item'>{props.turnover}</h3>
            <h3 className='row-report_item'>{props.cost}</h3>
            <h3 className='row-report_item'>{props.profit}</h3>
    
        </div>
      )
}

export default RowReport