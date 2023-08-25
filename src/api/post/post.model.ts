import mongoose, {
  FilterQuery,
  HydratedDocument,
  InferSchemaType,
  Model,
  ObtainSchemaGeneric,
  PaginateOptions,
  PaginateResult,
  Schema,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// export interface IPostDocument extends mongoose.Document {
//   title: string;
//   body: string;
//   lastComment?: string;
//   lastCommentDate?: Date;
// }

const PostSchema = new Schema(
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
    versionKey: false,
  }
);

PostSchema.plugin(mongoosePaginate);

type TSchema = typeof PostSchema;
type QueryHelpers = ObtainSchemaGeneric<TSchema, "TQueryHelpers">;
type InstanceMethods = ObtainSchemaGeneric<TSchema, "TInstanceMethods">;
type TVirtuals = ObtainSchemaGeneric<TSchema, "TVirtuals">;
type StaticMethods = ObtainSchemaGeneric<TSchema, "TStaticMethods">;

type IPost = InferSchemaType<TSchema>;
type PostDocument = HydratedDocument<
  IPost,
  InstanceMethods & TVirtuals,
  QueryHelpers
>;

// override mongose.PaginateModel to fix the type of PaginateDocument & define the Model type
interface PaginateModel
  extends StaticMethods,
    Model<
      IPost,
      QueryHelpers,
      InstanceMethods,
      TVirtuals,
      PostDocument,
      TSchema
    > {
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IPost>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PostDocument>) => void
  ): Promise<PaginateResult<PostDocument>>;
}

// override mongose.PaginateModel to fix the type of PaginateDocument & define the Model type

const Post = mongoose.model<PostDocument, mongoose.PaginateModel<PostDocument>>(
  "Post",
  PostSchema
);

export default Post;
export { IPost, PostDocument, Post };
