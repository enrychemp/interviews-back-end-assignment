import { Request, Response } from "express";
import postModel, { IPost } from "./post.model";

export const index = async (req: Request, res: Response) => {
  try {
    const posts: IPost[] = await postModel.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};
