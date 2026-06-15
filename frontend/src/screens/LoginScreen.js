import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Link, useNavigate } from 'react-router-dom' 
import { Form } from 'react-bootstrap'
import '../screens/Login.css'

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
    <div className="login-page-container">
      <div className="login-page">
        <div className="login-hero">
          <div className="hero-badge">BEM-VINDO</div>
          <h1 className="hero-title">
             O melhor <span>e-commerce</span>
          </h1>
          <p className="hero-sub">
            Garanta os melhores produtos com os melhores preços.
          </p>
          <div className="hero-trust">
            <div className="trust-item">
              <div className="trust-num">500+</div>
              <div className="trust-label">Clientes</div>
            </div>
            <div className="trust-item">
              <div className="trust-num">100%</div>
              <div className="trust-label">Confiabilidade</div>
            </div>
          </div>
        </div>
        
        <div className="login-form-side">
          <div className="login-box">
            <h1>Login</h1>
            
            <Form onSubmit={submitHandler}>
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
                  placeholder="Digite sua senha" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              
              <button type="submit" className="btn-login">Entrar</button>
            </Form>
            
            <div className="login-footer">
              <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen