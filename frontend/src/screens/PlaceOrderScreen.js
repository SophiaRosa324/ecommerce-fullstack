import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { Container, Row, Col, ListGroup, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const orderCreate = useSelector(state => state.orderCreate)
  const { success, order, error } = orderCreate

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10)
  const taxPrice = addDecimals(Number(0.15 * itemsPrice))
  const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))

  useEffect(() => {
    if (success) navigate(`/order/${order._id}`)
  }, [success, order, navigate])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice, shippingPrice, taxPrice, totalPrice
    }))
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Entrega</h2>
              <p><strong>Endereço:</strong> {cart.shippingAddress?.address}, {cart.shippingAddress?.city}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Pagamento</h2>
              <p><strong>Método:</strong> {cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Itens do pedido</h2>
              {cart.cartItems.length === 0 ? (
                <p>Carrinho vazio</p>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div key={index}>
                    {item.name} x {item.qty} = R$ {item.price * item.qty}
                  </div>
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item><h2>Resumo</h2></ListGroup.Item>
            <ListGroup.Item>Itens: R$ {itemsPrice}</ListGroup.Item>
            <ListGroup.Item>Frete: R$ {shippingPrice}</ListGroup.Item>
            <ListGroup.Item>Impostos: R$ {taxPrice}</ListGroup.Item>
            <ListGroup.Item><strong>Total: R$ {totalPrice}</strong></ListGroup.Item>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup.Item>
              <Button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>
                Finalizar Pedido
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderScreen