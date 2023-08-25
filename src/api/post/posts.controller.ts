import { Request, Response } from "express";
import postModel, { PostDocument } from "./post.model";
import { AnyKeys, PaginateResult } from "mongoose";
import commentModel from "../comment/comment.model";

const safeQueryProperty = [
  "title",
  "body",
  "lastComment",
  "lastCommentDate",
  "createdAt",
  "updatedAt",
];

type parsedQuery = {
  page?: number;
  per?: number;
  q?: string[];
  start?: string[];
  eq?: string[];
  sort?: {};
};

export const index = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      per = 10,
      q = [],
      start = [],
      eq = [],
      sort = { number: "asc" },
    }: parsedQuery = req.query;

    const limit = per;
    const query = {};

    for (let p in q) {
      if (safeQueryProperty.includes(p.toLowerCase())) {
        const expression = `.*${q[p]}.*`;
        query[p.toLowerCase()] = new RegExp(expression, "i");
      }
    }
    for (let p in start) {
      if (safeQueryProperty.includes(p.toLowerCase())) {
        const expression = `^${start[p]}.*`;
        query[p.toLowerCase()] = new RegExp(expression, "i");
      }
    }
    for (let p in eq) {
      if (safeQueryProperty.includes(p.toLowerCase())) {
        if (isNaN(+eq[p])) {
          const expression = `^${eq[p]}$`;
          query[p.toLowerCase()] = new RegExp(expression, "i");
        } else {
          query[p.toLowerCase()] = +eq[p];
        }
      }
    }

    for (let s in sort) {
      if (s && safeQueryProperty.includes(s.toLowerCase())) {
        sort[s.toLowerCase()] = sort[s] == "desc" ? -1 : 1;
      }
    }

    const posts: PaginateResult<PostDocument> = await postModel.paginate(
      query,
      {
        page,
        limit,
        sort,
      }
    );
    return res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      per = 10,
      sort = { createdAt: "desc" },
    }: parsedQuery = req.query;

    const limit = per;
    const post = await postModel.findOne({ _id: id });
    const comments = await commentModel.paginate(
      { postId: id },
      {
        page,
        limit,
        sort,
      }
    );
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ post, comments });
  } catch (error) {
    // console.error(error);
    return res.status(400).json(error);
  }
};
