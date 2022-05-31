import React from 'react'
import SideBarChief from '../component/sidebar/ChiefAccountantSidebar'
export const ChiefLayout = ({children}) => {
  return (
    <div className='chiefLayout layout' style={{display:'flex'}}>
    <SideBarChief/>
    {children}
    </div>
  )
}
