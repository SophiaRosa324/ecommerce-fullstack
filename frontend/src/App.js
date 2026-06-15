import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserEditScreen from './screens/UserEditScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />  {/* ← ADICIONE */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/shipping" element={<PrivateRoute><ShippingScreen /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><PaymentScreen /></PrivateRoute>} />
          <Route path="/placeorder" element={<PrivateRoute><PlaceOrderScreen /></PrivateRoute>} />
          <Route path="/order/:id" element={<PrivateRoute><OrderScreen /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
          {/* Admin */}
          <Route path="/admin/users" element={<AdminRoute><UserListScreen /></AdminRoute>} />
          <Route path="/admin/user/:id/edit" element={<AdminRoute><UserEditScreen /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductListScreen /></AdminRoute>} />
          <Route path="/admin/product/:id/edit" element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><OrderListScreen /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App