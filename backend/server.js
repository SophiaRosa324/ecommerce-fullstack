import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors'

app.use(cors())
dotenv.config()
connectDB()

const app = express()

app.use(express.json()) // middleware para parsear JSON

// Rotas
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('API está rodando')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})