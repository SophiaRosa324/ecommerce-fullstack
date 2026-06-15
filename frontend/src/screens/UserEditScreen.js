import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { getUserDetailsById, updateUser } from '../actions/userActions'

const UserEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'USER_UPDATE_RESET' })
      navigate('/admin/users')
      return
    }

    // Se ainda não temos os dados do usuário OU o usuário carregado não corresponde ao ID da URL
    if (!user || user._id !== id) {
      dispatch(getUserDetailsById(id))
    } else {
      // Preenche o formulário com os dados do usuário
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, navigate, id, successUpdate, user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }

  return (
    <Container className="py-4">
      <h1>Editar Usuário</h1>

      {loadingUpdate && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
          <p>Atualizando...</p>
        </div>
      )}

      {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
      {successUpdate && <Alert variant="success">Usuário atualizado com sucesso!</Alert>}

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
          <p>Carregando dados do usuário...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : user ? (  // <-- Verifica se user existe antes de renderizar o formulário
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Administrador"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loadingUpdate}>
            Atualizar
          </Button>
        </Form>
      ) : (
        <Alert variant="warning">Usuário não encontrado</Alert>
      )}
    </Container>
  )
}

export default UserEditScreen