import React from 'react'
import './RowReport.css'
import ReactNumberTextFormat from '../numberformat/template/ReactNumberTextFormat';
function RowCustomerReport({value,k}) {
    const total = value!== undefined && value.reduce((d,v) => {
       
        d.b = d.b + v.totalValue;
        return d;
    } ,{
       
        b:0,
    })
    
    return (
        <div className="row-report" >
            <h3 className='row-report_item'>{value[0].customer.name}</h3>
            <h3 className='row-report_item'>{value.length}</h3>
            <h3 className='row-report_item'><ReactNumberTextFormat value={total.b}/></h3>
            <h3 className='row-report_item'>{value[0].customer.email}</h3>
            <h3 className='row-report_item'>{value[0].customer.phoneNumber}</h3>

    
        </div>
      )
}

export default RowCustomerReport