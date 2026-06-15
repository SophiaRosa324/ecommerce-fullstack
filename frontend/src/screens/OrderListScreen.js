import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders = [] } = orderList  // fallback

  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  return (
    <AdminLayout title="Pedidos">
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="admin-section-title">Pedidos</h2>
        </Col>
      </Row>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert variant="info">Nenhum pedido encontrado.</Alert>
      ) : (
        <Table striped bordered hover responsive className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUÁRIO</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGO</th>
              <th>ENTREGUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || 'Usuário removido'}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice?.toFixed(2)}</td>
                <td>{order.isPaid ? 'Sim' : 'Não'}</td>
                <td>{order.isDelivered ? 'Sim' : 'Não'}</td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="light" size="sm">Detalhes</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  )
}

export default OrderListScreen