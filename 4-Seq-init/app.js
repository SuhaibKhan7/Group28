const express = require("express");
const syncDatabase = require("./models");
const { router } = require("./routes/user.router");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;
app.use("/api/user", router);
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
