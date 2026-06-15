import api from '../api'

export const listProducts = (keyword = '', category = '') => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' })
    
    let url = `/api/products?keyword=${encodeURIComponent(keyword)}`
    if (category) {
      url += `&category=${encodeURIComponent(category)}`
    }
    
    const { data } = await api.get(url)
    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'PRODUCT_LIST_FAIL', payload: error.response?.data?.message || error.message })
  }
}

// 🔹 DETALHES DE UM PRODUTO
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

    const { data } = await api.get(`/api/products/${id}`)

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


// 🔹 (EXTRA) CRIAR PRODUTO (ADMIN)
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_CREATE_REQUEST' })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await api.post('/api/products', {}, config)

    dispatch({
      type: 'PRODUCT_CREATE_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_UPDATE_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await api.put(`/api/products/${product._id}`, product, config)
    dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'PRODUCT_UPDATE_FAIL', payload: error.response?.data?.message || error.message })
  }
}

// 🔹 (EXTRA) DELETAR PRODUTO (ADMIN)
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_DELETE_REQUEST' })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await api.delete(`/api/products/${id}`, config)

    dispatch({
      type: 'PRODUCT_DELETE_SUCCESS',
    })
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}