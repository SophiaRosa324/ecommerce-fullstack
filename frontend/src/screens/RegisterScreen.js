import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import '../screens/Login.css'

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
    <div className="login-page-container">
      <div className="login-page">
        <div className="login-hero">
          <div className="hero-badge">CRIE SUA CONTA</div>
          <h1 className="hero-title">Junte-se a nós</h1>
          <p className="hero-sub">Crie sua conta para acompanhar pedidos, salvar favoritos e receber ofertas exclusivas.</p>
        </div>

        <div className="login-form-side">
          <div className="login-box">
            <div className="login-header">
              <h2>Cadastro</h2>
              <p>Já tem conta? <Link to="/login">Faça login</Link></p>
            </div>

            {message && <div className="login-error">{message}</div>}
            {error && <div className="login-error">{error}</div>}
            {loading && <p>Carregando...</p>}

            <Form onSubmit={submitHandler}>
              <div className="form-group">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Escolha uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Form.Label>Confirmar Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-login">Cadastrar</button>
            </Form>

            <div className="login-footer">
              <p>Ao se cadastrar, você concorda com nossos <Link to="#">termos</Link> e <Link to="#">políticas</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen