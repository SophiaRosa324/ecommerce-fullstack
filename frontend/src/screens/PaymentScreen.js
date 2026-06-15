import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
  const [method, setMethod] = useState('Pix')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(method))
    navigate('/placeorder')
  }

  return (
    <Container className="py-4">
      <CheckoutSteps step1 step2 />
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="p-4 shadow-sm checkout-panel">
            <h2 className="mb-3">Pagamento</h2>
            <p className="text-muted">Escolha a forma de pagamento que deseja utilizar.</p>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4">
                <Form.Label>Selecione o método</Form.Label>
                <Form.Select value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="PayPal">PayPal</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Continuar para revisão
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentScreen