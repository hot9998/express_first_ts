import { Request, Response, Router, NextFunction } from "express";
import bodyParser from "body-parser";

const router = Router();
const User = require("../model/user");

router.use(bodyParser.urlencoded({ extended: true }));

type userType = {
  username: string;
  email: string;
  password: string;
};

router.post(
  "/:username/:email/:password",
  (req: Request, res: Response, next: NextFunction) => {
    User.create(
      {
        username: req.params.username,
        email: req.params.email,
        password: req.params.password,
      },
      (err: any, user: userType) => {
        if (err) return res.status(500).send("User 생성 실패");
        res.status(200).send(user);
      }
    );
  }
);

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  User.find({}, function (err: any, users: userType) {
    if (err) return res.status(500).send("User 전체 조회 실패");
    res.status(200).send(users);
  });
});

router.get("/get/:id", (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.id, (err: any, user: userType) => {
    if (err) return res.status(500).send("User 조회 실패");
    if (!user) return res.status(404).send("User 없음");
    res.status(200).send(user);
  });
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  User.findByIdAndRemove(req.params.id, (err: any, user: userType) => {
    if (err) return res.status(500).send("User 삭제 실패");
    res.status(200).send("User " + user.username + " 삭제됨.");
  });
});

router.put(
  "/:id/:username/:email/:password",
  (req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.params,
      { new: true },
      (err: any, user: userType) => {
        if (err) return res.status(500).send("User 수정 실패");
        res.status(200).send(user);
      }
    );
  }
);

export default router;
