import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams, useLocation, Link } from 'react-router-dom'

const CartScreen = () => {
  const { id } = useParams()
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
  }

  const handleQtyChange = (product, newQty) => {
    if (newQty > 0) {
      dispatch(addToCart(product, newQty))
    }
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)

  return (
    <div className="cart-screen">
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#0f172a' }}>Seu Carrinho</h1>
      
      {cartItems.length === 0 ? (
        <div className="cart-items-section">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Seu carrinho está vazio</p>
            <Link to="/" style={{ 
              padding: '0.8rem 1.5rem', 
              background: '#0f172a', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
              fontWeight: '600'
            }}>
              Continuar Comprando
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          {/* Lista de itens */}
          <div className="cart-items-section">
            <h2>Produtos ({totalItems})</h2>
            {cartItems.map(item => (
              <div key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-info">
                  <Link to={`/product/${item.product}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="cart-item-qty">
                  <button 
                    className="cart-qty-btn"
                    onClick={() => handleQtyChange(item.product, item.qty - 1)}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="cart-qty-input" 
                    value={item.qty} 
                    readOnly 
                  />
                  <button 
                    className="cart-qty-btn"
                    onClick={() => handleQtyChange(item.product, item.qty + 1)}
                    disabled={item.qty >= item.countInStock}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="cart-item-remove"
                  onClick={() => removeHandler(item.product)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="cart-summary">
            <h3 className="summary-title">Resumo do Pedido</h3>
            
            <div className="summary-row">
              <label>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):</label>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="summary-row">
              <label>Frete:</label>
              <span>Grátis</span>
            </div>
            
            <div className="summary-row total">
              <label>Total:</label>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <Link 
              to="/shipping" 
              className="btn-checkout"
              style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '1rem' }}
            >
              Finalizar Compra
            </Link>
            
            <Link 
              to="/" 
              className="btn-continue-shopping"
              style={{ display: 'inline-block', width: '100%', textAlign: 'center', padding: '0.7rem' }}
            >
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartScreen