import { Request, Response } from "express";
import commentModel from "./comment.model";
import postModel from "../post/post.model";
export const createComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw "No id";
    }

    const post = await postModel.findOne({ _id: id });
    if (!post) {
      throw "Post not found";
    }

    const { comment } = req.body;
    const newComment = await commentModel.create({
      comment,
      createdAt: new Date(),
      postId: id,
    });
    post.lastComment = newComment;
    await post.save();

    return res.status(200).json({ comment: newComment, post });
  } catch (error) {
    res.status(400).json({ error });
  }
};
