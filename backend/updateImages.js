import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/productModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const updateProductImages = async () => {
  try {
    const products = await Product.find({})
    
    for (let product of products) {
      // Gera uma imagem aleatória do Lorem Picsum (200x200)
      const randomId = Math.floor(Math.random() * 1000)
      product.image = `https://picsum.photos/id/${randomId}/200/200`
      await product.save()
      console.log(`✅ Imagem atualizada para: ${product.name}`)
    }
    
    console.log('🎉 Todas as imagens foram atualizadas!')
    process.exit()
  } catch (error) {
    console.error('Erro:', error)
    process.exit(1)
  }
}

updateProductImages()