import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Container, Row, Col, Form, Button, Alert, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) window.location.href = '/login'
    else {
      if (!user?.name) {
        dispatch(getUserDetails())
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) setMessage('Senhas não conferem')
    else dispatch(updateUserProfile({ id: user._id, name, email, password }))
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={3}>
          <h2>Perfil</h2>
          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Atualizado com sucesso</Alert>}
          {loading && <p>Carregando...</p>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Deixe em branco para manter a mesma" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">Atualizar</Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Meus Pedidos</h2>
          {loadingOrders ? <p>Carregando...</p> : errorOrders ? <Alert variant="danger">{errorOrders}</Alert> : (
            <Table striped bordered hover responsive>
              <thead>
                <tr><th>ID</th><th>DATA</th><th>TOTAL</th><th>PAGO</th><th>ENTREGUE</th><th></th></tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt?.substring(0,10)}</td>
                    <td>R$ {order.totalPrice}</td>
                    <td>{order.isPaid ? 'Sim' : 'Não'}</td>
                    <td>{order.isDelivered ? 'Sim' : 'Não'}</td>
                    <td><Link to={`/order/${order._id}`}>Detalhes</Link></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen