const Cart = require('../models/cart_model');
const User = require('../models/user_model');

exports.getCart = (req, res) => {
  const user_id = req.params.user_id
  const is_user = User.exists({ _id: user_id })
  if (!is_user) {
    return res.status(400).json({ status: false, message: 'Invalid user ID' })
  } else {
    const cart = Cart.findOne({ user_id: user_id })
    if (!cart) {
      res
        .status(404)
        .json({ success: false, message: 'Cart not found for this user' })
    } else {
      res.status(200).json({ success: true, cart: cart })
    }
  }
}

exports.addItemToCart = async (req, res) => {
  let user_id = req.params.user_id
  let user = await User.exists({ _id: user_id })
  if (!user_id || !isValidObjectId(user_id) || !user)
    return res.status(400).json({ status: false, message: 'Invalid user ID' })

  let productId = req.body.productId
  if (!productId)
    return res.status(400).json({ status: false, message: 'Invalid product' })

  let cart = await Cart.findOne({ user_id: user_id })
  if (cart) {
    let itemIndex = cart.products.findIndex((p) => p.productId == productId)
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex]
      productItem.quantity += 1
      cart.products[itemIndex] = productItem
    } else {
      cart.products.push({ productId: productId, quantity: 1 })
    }
    cart = await cart.save()
    return res.status(200).json({ status: true, updatedCart: cart })
  } else {
    const newCart = await Cart.create({
      user_id,
      products: [{ productId: productId, quantity: 1 }],
    })
    return res.status(201).json({ status: true, newCart: newCart })
  }
}

exports.decreaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  let user_id = req.params.user_id
  let user = await User.exists({ _id: user_id })
  let productId = req.body.productId

  if (!user_id || !isValidObjectId(user_id) || !user)
    return res.status(400).json({ status: false, message: 'Invalid user ID' })

  let cart = await Cart.findOne({ user_id: user_id })
  if (!cart)
    return res
      .status(404)
      .json({ status: false, message: 'Cart not found for this user' })

  let itemIndex = cart.products.findIndex((p) => p.productId == productId)

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex]
    productItem.quantity -= 1
    cart.products[itemIndex] = productItem
    cart = await cart.save()
    return res.status(200).json({ status: true, updatedCart: cart })
  }
  res
    .status(400)
    .json({ status: false, message: 'Item does not exist in cart' })
}

exports.removeItem = async (req, res) => {
  let user_id = req.params.user_id
  let user = await User.exists({ _id: user_id })
  let productId = req.body.productId

  if (!user_id || !isValidObjectId(user_id) || !user)
    return res.status(400).json({ status: false, message: 'Invalid user ID' })

  let cart = await Cart.findOne({ user_id: user_id })
  if (!cart)
    return res
      .status(404)
      .json({ status: false, message: 'Cart not found for this user' })

  let itemIndex = cart.products.findIndex((p) => p.productId == productId)
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1)
    cart = await cart.save()
    return res.status(200).json({ status: true, updatedCart: cart })
  }
  res
    .status(400)
    .json({ status: false, message: 'Item does not exist in cart' })
}
