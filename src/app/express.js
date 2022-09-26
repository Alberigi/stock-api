const express = require('express');

const app = express();

app.use(express.json());

require('./controller/user.controller')(app);
require('./controller/stock.controller')(app);
require('./controller/portfolio.controller')(app);
require('./controller/auth.controller')(app);

module.exports = app;