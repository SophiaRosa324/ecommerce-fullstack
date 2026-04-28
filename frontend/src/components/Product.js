import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div>
        <h3>{product.name}</h3>
        <p>R$ {product.price}</p>
      </div>
    </div>
  )
}

export default Product