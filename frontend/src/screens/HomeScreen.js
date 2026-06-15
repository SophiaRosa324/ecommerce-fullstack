import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')

  const productList = useSelector(state => state.productList)
  const { products = [] } = productList

  // Busca produtos com base na keyword (funciona igual ao original)
  useEffect(() => {
    dispatch(listProducts(keyword || ''))
  }, [dispatch, keyword])

  // Aplica o filtro de categoria (localmente, sem backend)
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  // Destaques e promoções usam os produtos já filtrados por categoria
  const featured = filteredProducts.slice(0, 4)
  const promos = filteredProducts.slice(4, 8)

  // Extrai categorias dos produtos carregados (já filtrados pela busca)
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort()
  const categoriesToShow = categories.slice(0, 8)

  return (
    <main>
      <Container className="py-4">
        {/* Hero Section */}
        <section className="hero d-flex align-items-center mb-5">
          <div className="hero-content">
            <h1>Encontre os melhores produtos com preços imperdíveis</h1>
            <p className="lead">Frete rápido, garantia e segurança nas compras — aproveite ofertas diárias.</p>
          </div>
          <div className="hero-visual">{/*<img src="/banner-placeholder.png" alt="Promo banner" />*/}</div>
        </section>

        {/* Categorias com botões (filtro local) */}
        <section className="categories-section mb-5">
          <h2 className="section-title">Categorias</h2>
          <div className="categories-list d-flex flex-wrap gap-3">
            {categoriesToShow.length === 0 ? (
              <p className="text-muted">Nenhuma categoria encontrada.</p>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`category-pill ${selectedCategory === '' ? 'active' : ''}`}
                >
                  Todas
                </button>
                {categoriesToShow.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}
          </div>
        </section>

        {/* Destaques */}
        <section className="featured-section mb-5">
          <h2 className="section-title">Destaques</h2>
          <div className="product-grid">
            {featured.map(p => <Product key={p._id} product={p} />)}
          </div>
        </section>

        {/* Promoções */}
        <section className="promo-section mb-5">
          <h2 className="section-title">Promoções</h2>
          <div className="product-grid">
            {promos.map(p => <Product key={p._id} product={p} />)}
          </div>
        </section>
      </Container>
    </main>
  )
}

export default HomeScreen