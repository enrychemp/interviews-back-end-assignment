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

CommentSchema.post("save", async function (doc, next) {
  // const relatedPost = await Post.findById(doc.postId);
  // if (relatedPost) {
  //   relatedPost.lastComment = doc;
  //   await relatedPost.save();
  // }
  next();
});

export { CommentSchema };
