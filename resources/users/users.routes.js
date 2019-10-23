const express = require('express');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const validateUser = require('./users.validate');
let users = require('../../db').users;

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
  res.json(users);
  logger.warn('User getting users information');
});

usersRoutes.post('/', validateUser, (req, res) => {
  const hashedpassword = bcrypt.hashSync(req.body.password, 10)

  const newUser = {
    ...req.body,
    password: hashedpassword,
    id: uuidv4()
  };
  logger.info('Admin adding a new user');
  users.push(newUser);
  res.json(newUser);
})

usersRoutes.post('/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const user = users.find(user => user.name === name);

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (isAuthenticated) {
    // CREAR UN JWT
    const token = jwt.sign({
      id: user.id
    }, 'SECRET_KEY', {
      expiresIn: '10h'
    })
    logger.info('User login');
    res.json({
      token
    })
  } else {
    res.status(401).send('Verifica tu password');
  }
})

usersRoutes.put('/:id', (req, res) => {
  const filterUser = users.find(user => user.id === req.params.id);
  if (filterUser == null) {
    logger.info('User tried to modify other user information');
  } else {
    logger.info('User modified his/her information');
  }
  const updatedUser = Object.assign(filterUser, req.body);
  res.json(updatedUser);
})

// DESTROY

usersRoutes.delete('/:id', (req, res) => {
  const filterUserIndex = users.findIndex(user => user.id === req.params.id);
  if (filterUserIndex == null) {
    logger.info('User tried to delete other user');
  } else {
    logger.info('User delete his/her information');
  }
  const filterUser = users[filterUserIndex];

  users.splice(filterUserIndex, 1);

  res.json(filterUser);
});


module.exports = usersRoutes;