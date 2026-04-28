import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [{
    name: String, qty: Number, image: String, price: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }],
  shippingAddress: { address: String, city: String, postalCode: String, country: String },
  paymentMethod: { type: String, required: true },
  paymentResult: { id: String, status: String, update_time: String, email_address: String },
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order