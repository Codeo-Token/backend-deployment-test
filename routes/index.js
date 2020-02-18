const express = require('express');
const Router = express.Router();

//Router-require
const accountRouter = require('./account.route');
const userRouter = require('./user');

Router.use('/users', userRouter);
Router.use('/accounts', accountRouter);


module.exports = Router;