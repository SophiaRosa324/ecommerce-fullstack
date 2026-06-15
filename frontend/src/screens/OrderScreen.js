import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Alert } from 'react-bootstrap'
import { getOrderDetails, payOrder } from '../actions/orderActions'

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    if (!order || order._id !== id || successPay) {
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, id, order, successPay])

  const simulatePayment = () => {
    dispatch(
      payOrder(order._id, {
        id: Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: 'cliente@exemplo.com',
      })
    )
  }

  if (loading) {
    return (
      <div className="order-screen">
        <Container className="py-4">
          <div className="loader">Carregando pedido...</div>
        </Container>
      </div>
    )
  }

  if (error) {
    return (
      <div className="order-screen">
        <Container className="py-4">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-screen">
        <Container className="py-4">
          <Alert variant="warning">Pedido não encontrado.</Alert>
        </Container>
      </div>
    )
  }

  const {
    shippingAddress = {},
    paymentMethod = '',
    orderItems = [],
    isPaid = false,
    isDelivered = false,
    paidAt = null,
    deliveredAt = null,
    itemsPrice = 0,
    shippingPrice = 0,
    taxPrice = 0,
    totalPrice = 0,
  } = order

  return (
    <div className="order-screen">
      <Container className="py-4">
        <h1 className="mb-4">Pedido #{order._id}</h1>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Entrega</h2>
                <p>
                  <strong>Endereço:</strong>{' '}
                  {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                {isDelivered ? (
                  <Alert variant="success">
                    Entregue em {deliveredAt?.substring(0, 10)}
                  </Alert>
                ) : (
                  <Alert variant="warning">Pedido ainda não entregue</Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Pagamento</h2>
                <p>
                  <strong>Método:</strong> {paymentMethod}
                </p>
                {isPaid ? (
                  <Alert variant="success">
                    Pago em {paidAt?.substring(0, 10)}
                  </Alert>
                ) : (
                  <Alert variant="warning">Aguardando pagamento</Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Itens do Pedido</h2>
                {orderItems.length === 0 ? (
                  <Alert variant="info">Nenhum item encontrado</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="align-items-center">
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x R$ {item.price} = R${' '}
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            {/* NOVO BLOCO DE RESUMO ESTILIZADO */}
            <div className="order-summary-block">
              <h3>Resumo do Pedido</h3>

              <div className="summary-row">
                <span className="summary-label">Itens</span>
                <span className="summary-value">R$ {Number(itemsPrice).toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Frete</span>
                <span className="summary-value">R$ {Number(shippingPrice).toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Impostos</span>
                <span className="summary-value">R$ {Number(taxPrice).toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span className="summary-label">Total</span>
                <span className="summary-value">R$ {Number(totalPrice).toFixed(2)}</span>
              </div>

              {!isPaid && (
                <>
                  {loadingPay && (
                    <div className="alert alert-info mt-3">Processando pagamento...</div>
                  )}
                  <button className="btn-payment" onClick={simulatePayment}>
                    Simular Pagamento
                  </button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OrderScreen