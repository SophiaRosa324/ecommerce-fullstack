import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Sobre</h4>
          <p>Somos uma loja online dedicada a oferecer uma grande variedade de produtos com segurança e rapidez.</p>
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li>Email: suporte@lojaexemplo.com</li>
            <li>Telefone: (11) 4000-0000</li>
            <li>Atendimento: Seg–Sex, 9:00–18:00</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Redes sociais</h4>
          <div className="socials">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">Instagram</a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
