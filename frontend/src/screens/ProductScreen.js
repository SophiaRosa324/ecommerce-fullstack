import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listProductDetails } from '../actions/productActions';
import { Container, Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <Container className="py-3">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>Preço: R$ {product.price}</ListGroup.Item>
            <ListGroup.Item>Descrição: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>Preço: R$ {product.price}</ListGroup.Item>
            <ListGroup.Item>
              Status: {product.countInStock > 0 ? 'Em estoque' : 'Esgotado'}
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Form.Select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                </Form.Select>
                <Button onClick={addToCartHandler} className="mt-2" variant="primary" style={{ width: '100%' }}>
                  Adicionar ao carrinho
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;