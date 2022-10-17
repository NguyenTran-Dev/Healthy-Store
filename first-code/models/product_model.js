const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name_product: {
    type: String,
    require: true
  },
  desc_product: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  img_url: {
    type: String,
    require: true
  },
  stock: {
    type: Number,
    require: true
  },
  rate: {
    type: Number,
    require: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Product', product_schema);
