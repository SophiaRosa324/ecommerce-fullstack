import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

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
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Endereço de Entrega</h2>
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

            <Button type="submit" variant="primary">
              Continuar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen