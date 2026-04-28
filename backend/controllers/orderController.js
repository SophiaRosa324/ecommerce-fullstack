import Order from '../models/orderModel.js'

export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body
  if (orderItems.length === 0) {
    res.status(400).json({ message: 'Carrinho vazio' })
    return
  }
  const order = new Order({ orderItems, user: req.user._id, shippingAddress, paymentMethod, totalPrice })
  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
}

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
}

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
}

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = { id: req.body.id, status: 'completed', update_time: req.body.update_time, email_address: req.body.email_address }
    const updated = await order.save()
    res.json(updated)
  } else {
    res.status(404).json({ message: 'Pedido não encontrado' })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar pedido' })
  }
}