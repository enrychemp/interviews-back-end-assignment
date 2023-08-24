import { Router } from "express";
import { index } from "./posts.controller";

const postRouter = Router();

postRouter.get("/", index);
export default postRouter;
