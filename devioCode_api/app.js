var express = require('express');
var path = require('path');
var logger = require('morgan');
require('./app/config/database');
var cors = require('cors');

const app = express();

var orderRouter = require('./app/routes/orders');
var orderADMROUTER = require('./app/routes/ordersADM');
var productRouter = require('./app/routes/products');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('', orderRouter);
app.use('/pedidos', orderADMROUTER);
app.use('/inicio', productRouter);



module.exports = app;