import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ecommerce-fullstack-5zfz.onrender.com'
    : ''

const api = axios.create({
  baseURL: API_URL,
})

export default api