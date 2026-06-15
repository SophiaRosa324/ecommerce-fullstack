import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { users = [] } = userList
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Tem certeza?')) dispatch(deleteUser(id))
  }
  return (
    <AdminLayout title="Usuários">
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="admin-section-title">Usuários</h2>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="mt-3 admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Sim' : 'Não'}</td>
              <td>
                <Button variant="light" size="sm" onClick={() => navigate(`/admin/user/${user._id}/edit`)}>Editar</Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteHandler(user._id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default UserListScreen