const express = require('express')
const uuidv4 = require('uuid/v4');


const validateProduct = require('./products.validate');

let products = require('../../db').products;
let users = require('../../db').users;

const productsRoutes = express.Router()

productsRoutes.get('/', (req, res) => {
  res.json(products);
});

productsRoutes.post('/', validateProduct, (req, res) => {
  const newProduct = {
    ...req.body,
    id: uuidv4()
  };
  products.push(newProduct);
  res.json(newProduct);
})

productsRoutes.put('/:id/owner/:owner', (req, res) => {
  const filterProduct = products.find(product => (product.id === req.params.id && product.owner === req.params.owner));
  if (filterProduct == null) {
    res.send('Error durante la edición');
    return console.log('Error durante la edición');
  }
  const updatedProduct = Object.assign(filterProduct, req.body);
  res.json(updatedProduct);
})

// DESTROY

productsRoutes.delete('/:id/owner/:owner', (req, res) => {
  const filterProductIndex = products.findIndex(product => (product.id === req.params.id && product.owner === req.params.owner));
  if (filterProductIndex == null) {
    res.send('Error durante la edición');
    return console.log('Error durante la edición');
  }
  const filterProduct = products[filterProductIndex]

  products.splice(filterProductIndex, 1)

  res.json(filterProduct);
});


module.exports = productsRoutes;