const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
	jwt: { key, access_token_expire, refresh_token_expire },
} = require('../configs/env.config')

const createToken = (id) => { 
  const access_token = jwt.sign({ id }, key, {
    expiresIn: access_token_expire,
  })
  const refresh_token = jwt.sign({ id }, key, {
    expiresIn: refresh_token_expire,
  })
  return { access_token, refresh_token }
}

const sendToken = (user, statusCode, res) => {
  const { access_token, refresh_token } = createToken(user._id)
  res.status(statusCode).json({
    status: 'success',
    access_token,
    refresh_token,
    data: {
      user,
    },
  })
}

module.exports = { createToken, sendToken }