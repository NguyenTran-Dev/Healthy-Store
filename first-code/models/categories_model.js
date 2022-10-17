const mongoose = require('mongoose')

const categories = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  }
}, {timestamps: true})

module.exports = mongoose.model('Categories', categories);
