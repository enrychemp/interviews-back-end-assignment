import { Router, Request, Response, NextFunction } from "express";
import Consola from "consola";

import postRouter from "./post";

const router = Router();
router.use("/posts", postRouter);
export default router;
