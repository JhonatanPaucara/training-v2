const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const logger = require('./resources/utils/logger');
const productsRoutes = require('./resources/productos/products.routes');
const usersRoutes = require('./resources/users/users.routes');
const jwtStrategy = require('./resources/utils/jwt-strategy');

const app = express();
passport.use(jwtStrategy);
app.use(bodyParser.json());
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim()),
  }
}));
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

app.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  logger.info('User in homepage');
  res.status(200).send('Hola papu');
});
app.get('*', (req, res) => {
  logger.warn('User trying to enter from the URL');
  res.status(404).send('Web Page not found');
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`App listenning on port: ${PORT}`);
})