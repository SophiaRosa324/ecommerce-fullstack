import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    // 1. Limpar produtos existentes
    await Product.deleteMany()
    console.log('✅ Produtos existentes removidos')

    // 2. Buscar ou criar usuário admin (sem duplicar)
    let adminUser = await User.findOne({ email: 'admin@email.com' })
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin',
        email: 'admin@email.com',
        password: '123456',
        isAdmin: true
      })
      console.log('✅ Usuário admin criado')
    } else {
      console.log('✅ Usuário admin já existe (usando existente)')
    }

    // 3. Associar produtos ao admin
    const sampleProducts = products.map(p => ({
      ...p,
      user: adminUser._id
    }))

    // 4. Inserir produtos
    const inserted = await Product.insertMany(sampleProducts)
    console.log(`✅ ${inserted.length} produtos inseridos com sucesso!`)

    process.exit()
  } catch (error) {
    console.error('❌ ERRO no seeder:', error.message)
    process.exit(1)
  }
}

importData()