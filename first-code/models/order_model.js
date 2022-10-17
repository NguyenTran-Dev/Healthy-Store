const mongoose = require('mongoose');

const orders = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    id_customer: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    shipping_address: {
      type: String,
      require: true,
    },
    order_address: {
      type: String,
      require: true,
    },
    order_status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orders);
