import { Link } from 'react-router-dom'
import '../components/product.css'

const Product = ({ product }) => {
  return (
    <article className="product-card" aria-labelledby={`prod-${product._id}`}>
      <Link to={`/product/${product._id}`} className="product-thumb-link">
        <img src={product.image} alt={product.name} className="product-thumb" />
      </Link>
      <div className="product-card-body">
        <h3 id={`prod-${product._id}`} className="product-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <div className="product-meta">
          <span className="product-price">R$ {product.price}</span>
          <span className={`product-stock ${product.countInStock > 0 ? 'in-stock' : 'out-stock'}`}>
            {product.countInStock > 0 ? `${product.countInStock} em estoque` : 'Indisponível'}
          </span>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="btn btn-primary btn-buy">
            Comprar
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Product