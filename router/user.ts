import { Request, Response, Router, NextFunction } from "express";
import bodyParser from "body-parser";
const router = Router();
const userSchema = require("../model/user");

router.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/register/:username/:password",
  (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.params.username;
    const password: string = req.params.password;

    const user = {
      username,
      password,
    };
    try {
      userSchema.create(user);
      res.status(200).json({
        message: "Create succes",
        data: {
          user,
        },
      });
    } catch {
      (err: any) => {
        res.status(500).json({
          message: err,
        });
      };
    }
  }
);

router.get("/:username", (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.params.username;
  userSchema.findOne(username);
});

export default router;
