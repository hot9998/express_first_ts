import { Request, Response, Router, NextFunction } from "express";
const router = Router();
const userSchema = require("../model/user");

router.post(
  "/:id:/:username/:password",
  (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const username: string = req.params.username;
    const password: string = req.params.password;

    const userModel = new userSchema();

    const user = {
      id: id,
      username: username,
      password: password,
    };
    userModel.static.create(user);
  }
);

export default router;
