import Product from '../models/productModel.js'

// GET todos produtos (com busca opcional por nome ou categoria)
export const getProducts = async (req, res) => {
  try {
    // Construir filtro de keyword (busca por nome ou categoria)
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {}

    // Construir filtro de category (busca específica por categoria)
    const category = req.query.category
      ? {
          category: { $regex: req.query.category, $options: 'i' }
        }
      : {}

    // Combinar ambos os filtros
    const filter = { ...keyword, ...category }
    const products = await Product.find(filter)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET produto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST criar produto (admin)
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Novo Produto',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Marca',
      category: 'Categoria',
      countInStock: 0,
      description: 'Descrição'
    })
    const created = await product.save()
    res.status(201).json(created)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT atualizar produto (admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      product.name = req.body.name || product.name
      product.price = req.body.price || product.price
      product.description = req.body.description || product.description
      product.image = req.body.image || product.image
      product.brand = req.body.brand || product.brand
      product.category = req.body.category || product.category
      product.countInStock = req.body.countInStock || product.countInStock
      const updated = await product.save()
      res.json(updated)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE deletar produto (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      await product.deleteOne()
      res.json({ message: 'Produto removido' })
    } else {
      res.status(404).json({ message: 'Produto não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}