import express, { Request, Response } from "express";
import user from "./router/user";

const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
