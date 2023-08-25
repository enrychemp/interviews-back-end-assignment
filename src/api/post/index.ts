import { Router } from "express";
import { index, show } from "./posts.controller";

const postRouter = Router();

postRouter.get("/", index);
postRouter.get("/:id", show);
export default postRouter;
