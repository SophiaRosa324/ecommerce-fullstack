import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { logout } from '../actions/userActions'

const Header = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">Minha Loja</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form onSubmit={submitHandler} className="d-flex mx-auto">
            <Form.Control
              type="text"
              placeholder="Buscar produtos..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="outline-light">Buscar</Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">Carrinho</Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                {userInfo.isAdmin && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/admin/users">Usuários</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products">Produtos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orders">Pedidos</NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Sair</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header