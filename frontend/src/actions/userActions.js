import axios from 'axios'
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL
} from '../constants/userConstants'

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
    const { data } = await axios.post('/api/users/login', { email, password })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message || error.message })
  }
}

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}

// REGISTER
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })
    const { data } = await axios.post('/api/users', { name, email, password })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response?.data?.message || error.message })
  }
}

// GET USER DETAILS (profile)
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await axios.get('/api/users/profile', config)
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response?.data?.message || error.message })
  }
}

// UPDATE USER PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await axios.put('/api/users/profile', user, config)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response?.data?.message || error.message })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_LIST_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    const { data } = await axios.get('/api/users', config)
    dispatch({ type: 'USER_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'USER_LIST_FAIL', payload: error.response?.data?.message || error.message })
  }
}
// DELETAR USUÁRIO (admin)
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' })
    const { userLogin: { userInfo } } = getState()
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
    await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: 'USER_DELETE_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'USER_DELETE_FAIL', payload: error.response?.data?.message || error.message })
  }
}