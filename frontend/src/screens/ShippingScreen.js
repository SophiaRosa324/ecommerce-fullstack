import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <Container className="py-4">
      <CheckoutSteps step1 />
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 shadow-sm checkout-panel">
            <h2 className="mb-3">Endereço de Entrega</h2>
            <p className="text-muted">Preencha seus dados para prosseguir com a entrega.</p>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rua, número, complemento"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="city">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CEP"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="País"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-2">
                Continuar para pagamento
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen