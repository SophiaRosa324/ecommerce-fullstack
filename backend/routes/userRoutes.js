import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers          // ← importe a nova função
  , getUserById, updateUser, deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
router.post('/', registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').get(protect, admin, getUsers)   // ← rota admin
router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

export default router