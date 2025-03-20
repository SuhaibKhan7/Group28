import { User } from "../models/user.js";
export const helloWord = () => "Hello, World!";
export const newPost = (_, { title, content }) => {
  return { title, content };
};
export const addUser = async (_, { newuser }) => {
  console.log(newuser);
  const user = new User(newuser);
  await user.save();
  return user;
};
export const deleteUser = (_, name ) => {
  console.log(name);
};
