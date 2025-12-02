import React from 'react'
import LeftSection from '../components/LeftSection'
import SidePanel from '../components/SidePanel'

function AdminDashboard() {
  return (
    
    <div className="admin-section flex gap-10 items-start mx-10">
        <div className="panel">
            <SidePanel />
        </div>
        <div className="right flex-1">
            <LeftSection />
        </div>
        
    </div>
  )
}

export default AdminDashboard