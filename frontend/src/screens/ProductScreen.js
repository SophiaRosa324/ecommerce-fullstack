import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listProductDetails } from '../actions/productActions';
import '../components/product.css';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  
  const productDetails = useSelector(state => state.productDetails || {});
  const product = productDetails?.product;
  const loading = productDetails?.loading || false;
  const error = productDetails?.error || null;

  useEffect(() => {
    if (id) {
      dispatch(listProductDetails(id));
    }
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const incrementQty = () => {
    if (product && qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  if (loading) {
    return (
      <div className="product-screen">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#64748b' }}>Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-screen">
        <div style={{ textAlign: 'center', padding: '2rem', background: '#fee2e2', borderRadius: '12px' }}>
          <p style={{ color: '#991b1b', fontSize: '1rem' }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="product-screen">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Produto não encontrado.</p>
        </div>
      </div>
    );
  }

  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : '0.00';
  const inStock = product.countInStock > 0;

  return (
    <div className="product-screen">
      <div className="product-detail-container">
        {/* Imagem à esquerda */}
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image-main" />
        </div>

        {/* Informações à direita */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-description-text">{product.description}</p>
          </div>

          {/* Card de preço e status */}
          <div className="product-pricing-card">
            <div className="price-row">
              <span className="price-label">Preço</span>
              <span className="price-value">R$ {formattedPrice}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Disponibilidade</span>
              <span className={`stock-badge ${inStock ? 'in-stock' : 'out-stock'}`}>
                {inStock ? `${product.countInStock} em estoque` : 'Indisponível'}
              </span>
            </div>
          </div>

          {/* Seção de compra */}
          {inStock && (
            <div className="product-purchase-section">
              <div className="quantity-selector">
                <label className="qty-label">Quantidade:</label>
                <div className="qty-control">
                  <button className="qty-btn" onClick={decrementQty}>−</button>
                  <input type="number" className="qty-input" value={qty} readOnly />
                  <button className="qty-btn" onClick={incrementQty}>+</button>
                </div>
              </div>
              <button 
                className="btn-add-to-cart" 
                onClick={addToCartHandler}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;