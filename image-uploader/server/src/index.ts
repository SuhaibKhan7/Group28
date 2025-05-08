import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (Request, Response) => {

  Response.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
