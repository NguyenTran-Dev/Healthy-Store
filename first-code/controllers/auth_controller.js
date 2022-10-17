const User = require('../models/user_model')
const Validator = require('../utils/validators/validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const {
  rule_login,
  rule_change_password,
  rule_user,
} = require('../constants/rule_validator')

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body
  const is_check = Validator({ email, password }, rule_login)
  if (!is_check) {
    return res.status(404).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User do not exit',
      })
    } else {
      const is_password_correct = await bcrypt.compareSync(
        password,
        user.password
      )
      if (!is_password_correct) {
        return res.status(400).json({
          success: false,
          message: 'Password wrong',
        })
      } else {
        const token = await jwt.sign(
          { id: user._id, is_admin: user.is_admin },
          process.env.JWT
        )
        return res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json({
            success: true,
            message: 'Login successfully',
          })
      }
    }
  }
}

exports.postUser = async (req, res) => {
  console.log(req.body)
  const { full_name, email, password, phone_number, is_admin } = req.body
  const is_check = Validator(
    { full_name, email, password, phone_number, is_admin },
    rule_user
  )
  const salt = await bcrypt.genSalt(10)
  if (!is_check) {
    return res.status(412).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const new_user = new User({
      full_name,
      email,
      phone_number,
      password: await bcrypt.hash(password, salt),
      is_admin,
    })
    return new_user
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'Sign up success',
          user: result,
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

exports.changePassword = async (req, res) => {
  const _id = req.params.id
  const { password, new_password } = req.body
  const salt = await bcrypt.genSalt(10)
  const is_check = Validator({ password, new_password }, rule_change_password)
  if (!is_check) {
    return res.status(404).json({
      success: false,
      message: 'Invalid value',
    })
  } else {
    const user = await User.findOne({ _id: _id })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User do not exit',
      })
    } else {
      const is_password_correct = await bcrypt.compareSync(
        password,
        user.password
      )
      if (!is_password_correct) {
        return res.status(400).json({
          success: false,
          message: 'Current password wrong',
        })
      } else {
        User.findByIdAndUpdate(
          _id,
          { password: await bcrypt.hash(new_password, salt) },
          { useFindAndModify: false }
        )
          .then((result) => {
            res.status(200).json({
              success: true,
              message: `Update password is successfully`,
            })
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: 'Server error. Please try again.',
            })
          })
      }
    }
  }
}


