const express = require("express");
const syncDatabase = require("./models");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
