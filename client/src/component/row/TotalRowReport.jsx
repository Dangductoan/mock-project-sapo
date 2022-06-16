import React from 'react'
import './RowReport.css'
import ReactNumberTextFormat from '../numberformat/template/ReactNumberTextFormat';
function TotalRowReport({value}) {
    const total = value!== undefined && value.reduce((d,v) => {
        d.a = d.a + v.billQuantity;
        d.b = d.b + v.totalRevenue;
        return d;
    } ,{
        a:0,
        b:0,
    })
    
    return (
        <div className="row-report" >
            <h3 className='row-report_item'>Tổng</h3>
            <h3 className='row-report_item'>{total.a}</h3>
            <h3 className='row-report_item'><ReactNumberTextFormat value={total.b}/></h3>
         
        </div>
      )
}

export default TotalRowReport