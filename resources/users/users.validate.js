const Joi = require('@hapi/joi');
let users = require('../../db').users;
const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  nickName: Joi.string().min(2).max(5).required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  const validation = userSchema.validate(req.body);

  if (validation.error) {
    return res.status(403).send('Verifica tus datos')
  }
  next()
};

module.exports = validateUser;