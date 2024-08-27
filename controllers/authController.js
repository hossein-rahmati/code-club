const cathcAsync = require('../utils/cathcAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create jwt token
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// send jwt in cookies
const createSendToken = (res) => {
  const token = signToken(process.env.ADMIN_ID);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    token,
  });
};

const checkPassword = async (candidatePass, userPass) => {
  return await bcrypt.compare(candidatePass, userPass);
};

exports.login = cathcAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  if (!(await checkPassword(password, process.env.ADMIN_PASSWORD))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  createSendToken(res);
});

exports.protect = cathcAsync(async (req, res, next) => {
  let token;
  console.log(req.cookies);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  next();
});
