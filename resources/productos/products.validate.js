const Joi = require('@hapi/joi');
let users = require('../../db').users;
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().min(3).max(3).required(),
  owner: Joi.string().min(3).max(8).required(),
});

const validateProduct = (req, res, next) => {
  const validation = productSchema.validate(req.body);
  const productUser = users.find(user => user.id === req.body.owner);
  if (validation.error) {
    return res.status(403).send('Verifica tus datos');
  };
  if (productUser == null) {
    return res.status(403).send('No existe ese usuario');
  };
  next();
};

module.exports = validateProduct;