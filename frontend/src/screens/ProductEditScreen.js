import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { listProductDetails, updateProduct } from '../actions/productActions'

const ProductEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' })
      navigate('/admin/products')
    } else {
      if (!product || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, id, product, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ _id: id, name, price, image, brand, category, countInStock, description }))
  }

  return (
    <Container className="py-4">
      <h1>Editar Produto</h1>
      {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
      {loading ? <p>Carregando...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagem (URL)</Form.Label>
            <Form.Control type="text" value={image} onChange={e => setImage(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" value={brand} onChange={e => setBrand(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control type="text" value={category} onChange={e => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estoque</Form.Label>
            <Form.Control type="number" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loadingUpdate}>Atualizar</Button>
        </Form>
      )}
    </Container>
  )
}

export default ProductEditScreen