import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { Container, Row, Col, ListGroup, Button, Alert, Card, Image } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

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
      <CheckoutSteps step1 step2 step3 />
      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2 className="mb-4">Revisão do Pedido</h2>
              <div className="checkout-summary-block mb-4">
                <div>
                  <h5>Entrega</h5>
                  <p className="text-muted">{cart.shippingAddress?.address}, {cart.shippingAddress?.city}, {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}</p>
                </div>
                <div>
                  <h5>Pagamento</h5>
                  <p className="text-muted">{cart.paymentMethod}</p>
                </div>
              </div>

              <h5 className="mb-3">Itens do pedido</h5>
              {cart.cartItems.length === 0 ? (
                <Alert variant="info">Seu carrinho está vazio.</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product} className="checkout-item">
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col xs={5}>
                          <p className="mb-1 fw-semibold">{item.name}</p>
                          <small className="text-muted">Qtd: {item.qty} x R$ {item.price?.toFixed(2)}</small>
                        </Col>
                        <Col xs={4} className="text-end fw-bold">
                          R$ {(item.price * item.qty).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h2 className="mb-4">Resumo do Pedido</h2>
              <ListGroup variant="flush" className="summary-card">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span>Itens</span>
                  <strong>R$ {itemsPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span>Frete</span>
                  <strong>R$ {shippingPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <span>Impostos</span>
                  <strong>R$ {taxPrice}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 total-row">
                  <span>Total</span>
                  <strong>R$ {totalPrice}</strong>
                </ListGroup.Item>
              </ListGroup>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              <Button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} className="w-100 mt-4">
                Finalizar Pedido
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PlaceOrderScreen