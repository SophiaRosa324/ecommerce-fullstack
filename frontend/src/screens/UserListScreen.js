import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Container } from 'react-bootstrap'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { users } = userList
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Tem certeza?')) dispatch(deleteUser(id))
  }

  return (
    <Container className="py-4">
      <Table striped bordered hover responsive className="mt-3">
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
          <Button variant="light" size="sm">Editar</Button>{' '}
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
    </Container>
  )
}

export default UserListScreen