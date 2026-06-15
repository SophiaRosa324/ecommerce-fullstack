import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Alert, Row, Col } from 'react-bootstrap'
import AdminLayout from '../components/AdminLayout'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector(state => state.productList)
  const { loading, error, products = [] } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { success: successDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { success: successCreate, product: createdProduct } = productCreate

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch, successDelete, successCreate])

  useEffect(() => {
    if (successCreate && createdProduct) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [successCreate, createdProduct, navigate])

  const deleteHandler = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <AdminLayout title="Produtos">
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="admin-section-title">Produtos</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={createProductHandler} variant="primary">
            Criar Produto
          </Button>
        </Col>
      </Row>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert variant="info">Nenhum produto cadastrado.</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-3 admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGEM</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.name}</td>
                <td>R$ {product.price?.toFixed(2)}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" size="sm" className="me-2">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  )
}

export default ProductListScreen