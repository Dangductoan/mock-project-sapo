import React from 'react'
import './RowReport.css'
import ReactNumberTextFormat from '../numberformat/template/ReactNumberTextFormat'
function RowReport(props) {
    return (
        <div className="row-report" >
            <h3 className='row-report_item'>{props.date}</h3>
            <h3 className='row-report_item'>{props.amount}</h3>
            <h3 className='row-report_item format-right'><ReactNumberTextFormat value={props.turnover}/></h3>
           
    
        </div>
      )
}

export default RowReport