import React from 'react'
import './RowReport.css'
import ReactNumberTextFormat from '../numberformat/template/ReactNumberTextFormat';

function RowAccountantReport({value}) {
    const total = value!== undefined && value.reduce((d,v) => {
       
        d.b = d.b + v.totalValue;
        return d;
    } ,{
       
        b:0,
    })
    
    return (
        <div className="row-report" >
            <h3 className='row-report_item row-4'>{value[0].createdBy}</h3>
            <h3 className='row-report_item row-4'>{value.length}</h3>
            <h3 className='row-report_item row-4'><ReactNumberTextFormat value={total.b}/></h3>
          

    
        </div>
      )
}

export default RowAccountantReport