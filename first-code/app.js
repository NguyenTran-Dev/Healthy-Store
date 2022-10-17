require('dotenv').config();
const express = require('express');
const cors = require('cors')
const body_parse = require('body-parser');
const cookieParser = require('cookie-parser');
const product = require('./routers/product');
const categories = require('./routers/categories');
const cart = require('./routers/cart');
const user = require('./routers/user');
const order = require('./routers/order');
const auth = require('./routers/auth');
const mongoose_connect = require('./database/mongoose_db');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(body_parse.json({ limit: '30mb' }));
app.use(body_parse.urlencoded({ extended: false }));
app.use('/api/product', product);
app.use('/api/categories', categories);
app.use('/api/user', user);
app.use('/api/order', order);
app.use('/api/cart', cart);
app.use('/api', auth);

mongoose_connect(() => {
  app.listen(process.env.PORT);
  console.log(`Connected Port: ${process.env.PORT} is successfully!`);
});
