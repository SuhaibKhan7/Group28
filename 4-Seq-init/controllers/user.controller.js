const User = require("../models/user.models");

const createUser = async (req, res) => {
  const data = req.body;
  const user = await User.create(data);
  res.json(user);
};
const getUser = async (req, res) => {
  const user = await User.findAll({});
  res.send(user);
};

const fullname=aync(req,res)=>{
 const user = await User.findAll({});
  res.send(user);
}
module.exports = { createUser, getUser };
