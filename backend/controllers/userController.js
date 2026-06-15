import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// LOGIN
export const authUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id, name: user.name, email: user.email,
      isAdmin: user.isAdmin, token: generateToken(user._id)
    })
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos' })
  }
}

// REGISTRO
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ message: 'Usuário já existe' })
  const user = await User.create({ name, email, password })
  if (user) {
    res.status(201).json({
      _id: user._id, name: user.name, email: user.email,
      isAdmin: user.isAdmin, token: generateToken(user._id)
    })
  } else {
    res.status(400).json({ message: 'Dados inválidos' })
  }
}

// PERFIL (GET)
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) res.json(user)
  else res.status(404).json({ message: 'Usuário não encontrado' })
}

// PERFIL (UPDATE)
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) user.password = req.body.password
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email,
      isAdmin: updatedUser.isAdmin, token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' })
  }
}

// GET all users (admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

  // GET usuário por ID (admin)
  export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // UPDATE usuário (admin)
  export const updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin
        })
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // DELETE usuário (admin)
  export const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (user) {
        await user.deleteOne()
        res.json({ message: 'Usuário removido' })
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }