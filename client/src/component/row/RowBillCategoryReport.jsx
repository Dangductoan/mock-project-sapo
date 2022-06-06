import React from 'react'
import './RowReport.css'
function RowBillCategoryReport({value}) {
    
    
    return (
        <div className="row-report" >
            <h3 className='row-report_item row-4'>{value[0].billCategory.name}</h3>
            <h3 className='row-report_item row-4'>{value[0].billCategory.code}</h3>
            <h3 className='row-report_item row-4'>{value.length}</h3>
            <h3 className='row-report_item row-4'>{value[0].billCategory.description}</h3>

    
        </div>
      )
}

export default RowBillCategoryReport