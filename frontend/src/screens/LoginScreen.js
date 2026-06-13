import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'  // ← adicione Link
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
       <Col xs={12} md={6}>
        <Card className="p-4 shadow-sm">
    <h2 className="text-center">Login</h2>
    <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">Entrar</Button>
          </Form>
        </Card>
          <p className="mt-3">
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen