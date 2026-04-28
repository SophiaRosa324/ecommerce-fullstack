import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Alert } from 'react-bootstrap'
import { getOrderDetails, payOrder} from '../actions/orderActions'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  // Carregar pedido
  useEffect(() => {
    if (!order || order._id !== id || successPay) {
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, id, order, successPay])

  // Carregar script PayPal
  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`
      script.async = true
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }
    if (!window.paypal) addPayPalScript()
    else setSdkReady(true)
  }, [])

  // 👇 TRATAMENTO DE CARREGAMENTO E ERRO
  if (loading) {
    return <Container className="py-4"><div className="loader">Carregando pedido...</div></Container>
  }

  if (error) {
    return <Container className="py-4"><Alert variant="danger">{error}</Alert></Container>
  }

  if (!order) {
    return <Container className="py-4"><Alert variant="warning">Pedido não encontrado. Verifique o ID.</Alert></Container>
  }

  // 👇 SÓ A PARTIR DAQUI order EXISTE COM CERTEZA
  const { shippingAddress = {}, paymentMethod = '', orderItems = [], isPaid = false, isDelivered = false, paidAt = null, deliveredAt = null, itemsPrice = 0, shippingPrice = 0, taxPrice = 0, totalPrice = 0 } = order

  return (
    <Container className="py-4">
      <h1 className="mb-4">Pedido #{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0">
              <h2>Entrega</h2>
              <p>
                <strong>Endereço:</strong> {shippingAddress.address || 'Não informado'}, {shippingAddress.city || ''}{' '}
                {shippingAddress.postalCode || ''}, {shippingAddress.country || ''}
              </p>
              {isDelivered ? (
                <Alert variant="success">Entregue em {deliveredAt?.substring(0, 10)}</Alert>
              ) : (
                <Alert variant="warning">Não entregue</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="border-0">
              <h2>Pagamento</h2>
              <p><strong>Método:</strong> {paymentMethod}</p>
              {isPaid ? (
                <Alert variant="success">Pago em {paidAt?.substring(0, 10)}</Alert>
              ) : (
                <Alert variant="warning">Não pago</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="border-0">
              <h2>Itens</h2>
              {orderItems.length === 0 ? (
                <Alert variant="info">Nenhum item neste pedido</Alert>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item, idx) => (
                    <ListGroup.Item key={idx} className="d-flex align-items-center border-0 px-0">
                      <Image src={item.image} alt={item.name} fluid rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                      <div className="ms-3 flex-grow-1">
                        <Link to={`/product/${item.product}`} className="text-decoration-none">
                          {item.name}
                        </Link>
                      </div>
                      <div className="fw-bold">
                        {item.qty} x R$ {item.price?.toFixed(2)} = R$ {(item.qty * item.price).toFixed(2)}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0"><h2>Resumo</h2></ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0">
              <span>Itens:</span>
              <span>R$ {itemsPrice?.toFixed(2)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0">
              <span>Frete:</span>
              <span>R$ {shippingPrice?.toFixed(2)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between border-0">
              <span>Impostos:</span>
              <span>R$ {taxPrice?.toFixed(2)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between fw-bold border-0">
              <span>Total:</span>
              <span>R$ {totalPrice?.toFixed(2)}</span>
            </ListGroup.Item>

            {!isPaid && (
              <ListGroup.Item className="border-0">
                {loadingPay && <Alert variant="info">Processando pagamento...</Alert>}
                {!sdkReady ? (
                  <Alert variant="secondary">Carregando PayPal...</Alert>
                ) : (
                  <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{ amount: { value: totalPrice } }]
                        })
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(details => {
                          const paymentResult = {
                            id: details.id,
                            status: details.status,
                            update_time: details.update_time,
                            email_address: details.payer.email_address
                          }
                          dispatch(payOrder(order._id, paymentResult))
                        })
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderScreen