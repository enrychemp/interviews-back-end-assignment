import { Schema } from "mongoose";
import { CommentSchema } from "../comment/comment.schema";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    lastComment: CommentSchema,
  },
  {
    collection: "posts",
    strict: true,
    timestamps: true,
    versionKey: false,
  }
);

export { PostSchema };
