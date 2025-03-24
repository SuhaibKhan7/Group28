const sequelize = require("../config/database");
const User = require("./user.models");

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await User.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = syncDatabase;
