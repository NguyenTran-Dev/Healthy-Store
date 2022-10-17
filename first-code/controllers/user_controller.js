const User = require('../models/user_model');
const Validator = require('../utils/validators/validator');
const { rule_user_update } = require('../constants/rule_validator');

exports.getUsers = (req, res) => {
  User.find().then((result) => {
    return res.status(200).json({
      success: true,
      users: result
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message
    });
  })
};
exports.getUserbyId = (req, res) => {
  const _id = req.params.id;
  User.findById(_id).then(result => {
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Not found user with id " + id
      });
    } else {
      res.status(200).json({
        success: true,
        user: {
          email: result.email,
          full_name: result.full_name
        }
      });
    }
  }).catch((error) => {
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
  })
};
exports.updateUser = async (req, res) => {
  const { full_name, email, address } = req.body;
  const _id = req.params.id;
  const is_check = Validator({ full_name, email, address }, rule_user_update);
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value'
    })
  } else {
    const new_user = { full_name, email, address };
    User.findByIdAndUpdate(_id, new_user, { useFindAndModify: false }).then((result) => {
      if (!result) {
        res.status(400).json({
          success: false,
          message: `Cannot update user with id=${_id}. Maybe user was not found!`
        })
      } else {
        res.status(200).json({
          success: true,
          user: new_user
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
exports.deleteUser = (req, res) => {
  const _id = req.params.id;
  User.findByIdAndRemove(_id).then((result) => {
    res.status(200).json({
      success: true,
      message: 'Delete user success'
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};
