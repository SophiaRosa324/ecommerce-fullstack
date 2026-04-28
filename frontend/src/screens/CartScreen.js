import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams, useLocation, Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Button, Image, Form } from 'react-bootstrap'  // ← adicione Form

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

  return (
    <Container className="py-4">
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio. <Link to="/">Voltar às compras</Link></p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>R$ {formatPrice(item.price)}</Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => removeHandler(item.product)}>
                        Remover
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Total: {formatPrice(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button as={Link} to="/shipping" variant="success" className="w-100">
                  Finalizar compra
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default CartScreen