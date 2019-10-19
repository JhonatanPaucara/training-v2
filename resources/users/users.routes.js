const express = require('express')

const validateUser = require('./users.validate');
let users = require('../../db').users;

const usersRoutes = express.Router()

usersRoutes.get('/', (req, res) => {
  res.json(users);
});

usersRoutes.post('/', validateUser, (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
})

usersRoutes.put('/:id', (req, res) => {
  const filterUser = users.find(user => user.id === req.params.id);

  const updatedUser = Object.assign(filterUser, req.body);
  res.json(updatedUser);
})

// DESTROY

usersRoutes.delete('/:id', (req, res) => {
  const filterUserIndex = users.findIndex(user => user.id === req.params.id);
  const filterUser = users[filterUserIndex]

  users.splice(filterUserIndex, 1)

  res.json(filterUser);
});


module.exports = usersRoutes;