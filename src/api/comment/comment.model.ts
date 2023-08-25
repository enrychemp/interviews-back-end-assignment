import mongoose, {
  FilterQuery,
  HydratedDocument,
  InferSchemaType,
  Model,
  ObtainSchemaGeneric,
  PaginateOptions,
  PaginateResult,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { CommentSchema } from "./comment.schema";

CommentSchema.plugin(mongoosePaginate);

type TSchema = typeof CommentSchema;
type QueryHelpers = ObtainSchemaGeneric<TSchema, "TQueryHelpers">;
type InstanceMethods = ObtainSchemaGeneric<TSchema, "TInstanceMethods">;
type TVirtuals = ObtainSchemaGeneric<TSchema, "TVirtuals">;
type StaticMethods = ObtainSchemaGeneric<TSchema, "TStaticMethods">;

type IComment = InferSchemaType<TSchema>;
type CommentDocument = HydratedDocument<
  IComment,
  InstanceMethods & TVirtuals,
  QueryHelpers
>;

// override mongose.PaginateModel to fix the type of PaginateDocument & define the Model type
interface PaginateModel
  extends StaticMethods,
    Model<
      IComment,
      QueryHelpers,
      InstanceMethods,
      TVirtuals,
      CommentDocument,
      TSchema
    > {
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IComment>,
    options?: O,
    callback?: (err: any, result: PaginateResult<CommentDocument>) => void
  ): Promise<PaginateResult<CommentDocument>>;
}

// override mongose.PaginateModel to fix the type of PaginateDocument & define the Model type

const Comment = mongoose.model<
  CommentDocument,
  mongoose.PaginateModel<CommentDocument>
>("Comment", CommentSchema);

export default Comment;
export { IComment, CommentDocument, Comment };
