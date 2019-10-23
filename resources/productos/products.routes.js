const express = require('express');
const uuidv4 = require('uuid/v4');
const logger = require('../utils/logger');

const validateProduct = require('./products.validate');

let products = require('../../db').products;

const productsRoutes = express.Router();

productsRoutes.get('/', (req, res) => {
  res.json(products);
  logger.info('User getting products information');
});

productsRoutes.post('/', validateProduct, (req, res) => {
  const newProduct = {
    ...req.body,
    id: uuidv4()
  };
  products.push(newProduct);
  res.json(newProduct);
  logger.info('User adding a new product');
})

productsRoutes.put('/:id/owner/:owner', (req, res) => {
  const filterProduct = products.find(product => (product.id === req.params.id && product.owner === req.params.owner));
  if (filterProduct == null) {
    res.send('Error durante la edición');
    return logger.error('User tried to modify a product from other user');
  };
  const updatedProduct = Object.assign(filterProduct, req.body);
  res.json(updatedProduct);
  logger.info('User modify his/her product information');
})

// DESTROY

productsRoutes.delete('/:id/owner/:owner', (req, res) => {
  const filterProductIndex = products.findIndex(product => (product.id === req.params.id && product.owner === req.params.owner));
  if (filterProductIndex < 0) {
    res.send('Error durante la edición');
    return logger.error('User tried to delete a product from other user');
  };
  const filterProduct = products[filterProductIndex];
  products.splice(filterProductIndex, 1);
  logger.info('User delete his/her product');
  res.json(filterProduct);
});


module.exports = productsRoutes;