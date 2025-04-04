const profile = require("./profile.model");
const User = require("./user.models");

User.hasOne(profile, {
  foreignKey: "UserID",
});