const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

console.log(User === sequelize.models.User); // true
module.exports = User;
