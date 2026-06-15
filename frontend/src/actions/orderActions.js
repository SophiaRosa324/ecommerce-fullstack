import api from '../api'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_CREATE_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.post('/api/orders', order, config)
    
    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data })
    
    // 🧹 LIMPA O CARRINHO APÓS PEDIDO COM SUCESSO
    dispatch({ type: CART_CLEAR_ITEMS })
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  } catch (error) {
    dispatch({ type: 'ORDER_CREATE_FAIL', payload: error.response?.data?.message || error.message })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.get(`/api/orders/${id}`, config)
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'ORDER_DETAILS_FAIL', payload: error.response?.data?.message || error.message })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PAY_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.put(`/api/orders/${orderId}/pay`, paymentResult, config)
    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'ORDER_PAY_FAIL', payload: error.response?.data?.message || error.message })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_LIST_MY_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.get('/api/orders/myorders', config)
    dispatch({ type: 'ORDER_LIST_MY_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'ORDER_LIST_MY_FAIL', payload: error.response?.data?.message || error.message })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_LIST_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.get('/api/orders', config)
    dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'ORDER_LIST_FAIL', payload: error.response?.data?.message || error.message })
  }
}