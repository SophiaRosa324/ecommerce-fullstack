import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const HomeScreen = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword || ''))
  }, [dispatch, keyword])
  
console.log(products)
  return (
<Container className="py-4">
  <h1 className="mb-4">Produtos</h1>
  <Row>
    {Array.isArray(products) &&
     products.map(product => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Img variant="top" src={product.image} className="product-card-img" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text className="fw-bold text-primary">
              R$ {product.price}
            </Card.Text>
            <Button variant="primary" as={Link} to={`/product/${product._id}`}>
              Ver detalhes
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
  )
}

export default HomeScreen