const mongoose = require('mongoose');

const user_schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    is_admin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', user_schema);
