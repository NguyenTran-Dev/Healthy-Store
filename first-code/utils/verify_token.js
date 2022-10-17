const jwt = require('jsonwebtoken');
const create_error = require('./error');

const verify_token = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(create_error(401,'You are not authenticated'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(create_error(403, 'Token not valid'));
    req.user = user;
    next();
  })
}

const verify_user = (req, res, next) => {
  verify_token(req, res, () => {
    console.log(req.user.id, req.params.id);
    if (req.user.id == req.params.id || req.user.is_admin) {
      next();
    } else {
      next(create_error(401,'You are not authenticated'));
    }
  })
}
const verify_admin = (req, res, next) => {
  verify_token(req, res, (err, user) => {
    if (req.user.is_admin) {
      next();
    } else {
      next(create_error(401, 'You are not authenticated'));
    }
  })
}

module.exports = { verify_token, verify_user, verify_admin };
