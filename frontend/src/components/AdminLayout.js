import React from 'react'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ title, children }) => {
  return (
    <div className="admin-layout container py-4">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
