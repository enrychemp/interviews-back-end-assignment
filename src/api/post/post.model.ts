import { Schema } from "mongoose";
import dbConn from "../../libs/db";

export interface IPost {
  title: string;
  body: string;
  lastComment?: string;
  lastCommentDate?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    lastComment: { type: String },
    lastCommentDate: Date,
  },
  {
    collection: "posts",
    strict: true,
    timestamps: true,
  }
);

export default dbConn.model<IPost>("Post", PostSchema);
