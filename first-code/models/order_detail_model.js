const mongoose = require('mongoose');

const order_details = new mongoose.Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    product_id: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('OrderDetails', order_details);
