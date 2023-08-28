import { Router } from "express";
import {
  createPost,
  deletePost,
  listPost,
  showPost,
  updatePost,
} from "./posts.controller";
import { createComment } from "../comment/comments.controller";

const postRouter = Router();

postRouter.get("/", listPost);
postRouter.get("/:id", showPost);
postRouter.put("/:id", updatePost);
postRouter.post("/", createPost);
postRouter.post("/:id/comments", createComment);
postRouter.delete("/:id", deletePost);
export default postRouter;
