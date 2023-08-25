import { Schema } from "mongoose";
import Post, { PostDocument } from "../post/post.model";

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    createdAt: { type: Date },
  },
  {
    collection: "comments",
    strict: true,
    versionKey: false,
  }
);

export { CommentSchema };
