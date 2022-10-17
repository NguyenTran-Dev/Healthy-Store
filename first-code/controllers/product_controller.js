const mongoose = require('mongoose')
const { rule_product } = require('../constants/rule_validator')
const Product = require('../models/product_model')
const Validator = require('../utils/validators/validator')
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((result) => {
      return res.status(200).json({
        success: true,
        products: result || [],
      })
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      })
    })
}
exports.getProductbyId = (req, res, next) => {
  const _id = req.params.id
  if (!!_id) {
    Product.findById(_id)
      .then((result) => {
        if (!result) {
          res.status(404).json({
            success: false,
            message: 'Not found product with id ' + id,
          })
        } else {
          res.status(200).json({
            success: true,
            product: result,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Server error. Please try again.' })
      })
  } else {
    res.status(422).json({
      success: false,
      message: 'Invalid value!',
    })
  }
}
exports.postProduct = (req, res, next) => {
  const { name_product, desc_product, price, img_url, rate, stock } = req.body
  const is_check = Validator(
    { name_product, desc_product, price, img_url, rate, stock },
    rule_product
  )
  if (!is_check) {
    res.status(412).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name_product: name_product,
      desc_product: desc_product,
      price: price,
      stock: stock,
      img_url: img_url,
      rate: 0,
    })
    return product
      .save()
      .then((new_product) => {
        return res.status(201).json({
          success: true,
          message: 'New product created successfully',
          product: new_product,
        })
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        })
      })
  }
}
exports.updateProduct = (req, res, next) => {
  const _id = req.params.id
  const { name_product, desc_product, price, img_url, rate, stock } = req.body
  const is_check = Validator(
    { name_product, desc_product, price, img_url, rate, stock },
    rule_product
  )
  if (!is_check) {
    res.status(412).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    Product.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
      .then((result) => {
        if (!result) {
          res.status(400).json({
            success: false,
            message: `Cannot update product with id=${_id}. Maybe product was not found!`,
          })
        } else {
          res.status(200).json({
            success: true,
            product: result,
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        })
      })
  }
}
exports.deleteProduct = (req, res, next) => {
  const _id = req.params.id
  if (!!_id) {
    Product.findByIdAndDelete(_id)
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: 'Deleted product successfully',
        })
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        })
      })
  } else {
    res.status(422).json({
      success: false,
      message: 'Invalid id!',
    })
  }
}
