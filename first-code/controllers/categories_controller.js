const { rule_categories } = require('../constants/rule_validator')
const Categories = require('../models/categories_model')
const Validator = require('../utils/validators/validator')
exports.getCategories = (req, res) => {
  Categories.find()
    .then((result) => {
      res.status(200).json({
        success: true,
        categories: result,
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

exports.getCategoriesbyId = (req, res) => {
  const _id = req.params.id
  Categories.findById(_id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'Not found categories with id ' + id,
        })
      } else {
        res.status(200).json({
          success: true,
          categories: result,
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

exports.postCategories = (req, res) => {
  const { name, desc } = req.body
  const is_check = Validator({ name, desc }, rule_categories)
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const new_categories = new Categories({
      name: name,
      desc: desc
    })
    return new_categories
      .save()
      .then((new_categories) => {
        return res.status(201).json({
          success: true,
          message: 'New categories created successfully',
          categories: new_categories,
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

exports.updateCategories = (req, res) => {
  const _id = req.params.id;
  const { name, desc } = req.body
  const is_check = Validator({ name, desc }, rule_categories)
  if (!is_check) {
    res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  } else {
    const new_categories = { name, desc };
    Order.findByIdAndUpdate(_id, new_categories, { useFindAndModify: false }).then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: `Cannot update categories with id=${_id}. Maybe categories was not found!`
        })
      } else {
        res.status(200).json({
          success: true,
          categories: new_categories
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

exports.deleteCategories = (req, res) => {
  const _id = req.params.id;
  Categories.findByIdAndRemove(_id).then((result) => {
    res.status(200).json({
      success: true,
      message: 'Delete categories success'
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};
