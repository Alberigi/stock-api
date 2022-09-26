/* eslint-disable no-undef */
require("dotenv").config();

const app = require("./app/express");

app.listen(process.env.APP_PORT, () => {
  console.log(`listening on http://localhost:${process.env.APP_PORT}`);
});
