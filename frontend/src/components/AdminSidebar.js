import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Painel Admin</h2>
        <p>Gerencie produtos, pedidos e usuários</p>
      </div>
      <Link to="/admin/products" className={`admin-link ${isActive('/admin/products') ? 'active' : ''}`}>
        Produtos
      </Link>
      <Link to="/admin/orders" className={`admin-link ${isActive('/admin/orders') ? 'active' : ''}`}>
        Pedidos
      </Link>
      <Link to="/admin/users" className={`admin-link ${isActive('/admin/users') ? 'active' : ''}`}>
        Usuários
      </Link>
    </aside>
  )
}

export default AdminSidebar
