const { rule_order } = require('../constants/rule_validator');
const Order = require('../models/order_model');
const Validator = require('../utils/validators/validator');

exports.getOrders = (req, res) => {
  Order.find().then((result) => {
    res.status(200).json({
      success: true,
      orders: result
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  })
}

exports.getOrderbyId = (req, res) => {
  const _id = req.params.id;
  Order.findById(_id).then((result) => {
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Not found order with id " + id
      });
    } else {
      res.status(200).json({
        success: true,
        orders: result
      })
    }
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  })
}

exports.postOrder = (req, res, next) => {
  const { id_customer, amount, shipping_address, order_address, order_status } = req.body;
  const is_check = Validator({ id_customer, amount, shipping_address, order_address, order_status }, rule_order)
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  }
  else {
    const order = new OrderDetails({
      id_customer: id_customer,
      amount: amount,
      shipping_address: shipping_address,
      order_address: order_address,
      order_status: order_status
    })
    return order.save().then((order) => {
      return res.status(201).json({
        success: true,
        message: 'New order created successfully',
        order: order,
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

exports.updateOrder = (req, res) => {
  const _id = req.params.id;
  const { id_customer, amount, shipping_address, order_address, order_status } = req.body;
  const is_check = Validator({ id_customer, amount, shipping_address, order_address, order_status }, rule_order)
  if (!is_check) {
    res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  } else {
    const new_order = { id_customer, amount, shipping_address, order_address, order_status };
    Order.findByIdAndUpdate(_id, new_order, { useFindAndModify: false }).then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: `Cannot update order with id=${_id}. Maybe order was not found!`
        })
      } else {
        res.status(200).json({
          success: true,
          order: new_order
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

exports.deleteOrder = (req, res) => {
  const _id = req.params.id;
  Order.findByIdAndRemove(_id).then((result) => {
    res.status(200).json({
      success: true,
      message: 'Delete order success'
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};
