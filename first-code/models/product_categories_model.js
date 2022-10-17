const mongoose = require('mongoose')

const product_categories = new mongoose.Schema({
  product_id: {
    type: String,
    require: true,
  },
  categories_id: {
    type: String,
    require: true,
  }
}, {timestamps: true})

module.exports = mongoose.model('Product_categories', product_categories);
