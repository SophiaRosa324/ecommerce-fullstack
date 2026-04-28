import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { Container,Card, Row, Col, Form, Button, Alert } from 'react-bootstrap'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Senhas não conferem')
    else dispatch(register(name, email, password))
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="p-4 shadow-sm">
          <h2>Cadastro</h2>
          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <p>Carregando...</p>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">Cadastrar</Button>
          </Form>
          </Card>
          <p className="mt-3">Já tem conta? <Link to="/login">Login</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen