const OrderDetails = require('../models/order_detail_model');
const { rule_order_details } = require('../constants/rule_validator');
const Validator = require('../utils/validators/validator');

exports.getOrderDetails = (req, res) => {
  OrderDetails.find().then((result) => {
    res.status(200).json({
      success: true,
      order_details: result
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  })
}

exports.getOrderDetailsById = (req, res) => {
  const _id = req.params.id
  OrderDetails.findById(_id).then((result) => {
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Not found order detail with id " + id
      });
    } else {
      res.status(200).json({
        success: true,
        order_details: result
      })
    }
   
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  })
}
exports.postOrderDetails = (req, res, next) => {
  const { order_id, product_id, price, quantity } = req.body;
  const is_check = Validator({ order_id, product_id, price, quantity }, rule_order_details);
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  }
  else {
    const order_details = new OrderDetails({
      order_id: order_id,
      product_id: product_id,
      price: price,
      quantity: quantity,
    })
    return order_details.save().then((order_details) => {
      return res.status(201).json({
        success: true,
        message: 'New order details created successfully',
        order_details: order_details,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
  }
}

exports.updateOrderDetails = async (req, res) => {
  const { order_id, product_id, price, quantity } = req.body;
  const is_check = Validator({ order_id, product_id, price, quantity }, rule_order_details);
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  } else {
    const new_order_details = { order_id, product_id, price, quantity };
    OrderDetails.findByIdAndUpdate(_id, new_order_details, { useFindAndModify: false }).then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: `Cannot update order_details with id=${_id}. Maybe order_details was not found!`
        })
      } else {
        res.status(200).json({
          success: true,
          order_details: new_order_details
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
};

exports.deleteOrderDetails = (req, res) => {
  const _id = req.params.id;
  OrderDetails.findByIdAndRemove(_id).then((result) => {
    res.status(200).json({
      success: true,
      message: 'Delete order_details success'
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};
