const { rule_product_categories } = require('../constants/rule_validator')
const ProductCategories = require('../models/product_categories_model')
const Validator = require('../utils/validators/validator')

exports.getProductCategories = (req, res) => {
  ProductCategories.find()
    .then((result) => {
      res.status(200).json({
        success: true,
        product_categories: result,
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

exports.getProductCategoriesbyId = (req, res) => {
  const _id = req.params.id
  ProductCategories.findById(_id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'Not found product categories with id ' + id,
        })
      } else {
        res.status(200).json({
          success: true,
          product_categories: result,
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

exports.postProductCategories = (req, res) => {
  const { product_id, categories_id } = req.body;
  const is_check = Validator({ product_id, categories_id }, rule_product_categories);
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const new_product_categories = new ProductCategories({
      product_id: product_id,
      categories_id: categories_id
    })
    return new_product_categories
      .save()
      .then((new_product_categories) => {
        return res.status(201).json({
          success: true,
          message: 'New product categories created successfully',
          product_categories: new_product_categories,
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

exports.updateProductCategories = (req, res) => {
  const _id = req.params.id;
  const { product_id, categories_id } = req.body
  const is_check = Validator({ product_id, categories_id }, rule_product_categories)
  if (!is_check) {
    res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  } else {
    const new_product_categories = { product_id, categories_id };
    ProductCategories.findByIdAndUpdate(_id, new_product_categories, { useFindAndModify: false }).then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: `Cannot update product categories with id=${_id}. Maybe product categories was not found!`
        })
      } else {
        res.status(200).json({
          success: true,
          product_categories: new_product_categories
        });
      }
    }).catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
  }
}

exports.deleteProductCategories = (req, res) => {
  const _id = req.params.id;
  ProductCategories.findByIdAndRemove(_id).then((result) => {
    res.status(200).json({
      success: true,
      message: 'Delete product categories success'
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};
