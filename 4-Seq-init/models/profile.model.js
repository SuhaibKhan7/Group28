const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const profile = sequelize.define(
  "profile",
  {
    id: {
      id: DataTypes.INTEGER,
      autoIncrement: True,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
   UserID: {
      userid: DataTypes.INTEGER,
    }, 
  },
  {
    // Other model options go here
  }
);

// true
module.exports = profile;
