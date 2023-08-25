import { faker } from "@faker-js/faker";
import postModel from "../api/post/post.model";
import commentModel, {
  IComment,
  CommentDocument,
} from "../api/comment/comment.model";

const run = async (reset) => {
  if (reset) {
    // reset collections
    await postModel.deleteMany();
    await commentModel.deleteMany();
  }
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 5 });
    const body = faker.lorem.lines({ min: 4, max: 10 });
    const createdAt = faker.date.past();
    const updatedAt = faker.date.past();
    const post = new postModel({ title, body, createdAt, updatedAt });
    await post.save();
    const nComments = faker.number.int({ min: 0, max: 50 });
    const comments: IComment[] = [];

    for (let c = 0; c < nComments; c++) {
      comments.push({
        comment: faker.lorem.lines({ min: 4, max: 10 }),
        createdAt: faker.date.between({
          from: createdAt,
          to: new Date(),
        }),
        postId: post._id,
      });
    }
    await commentModel.create(comments);
    const lastComment = await commentModel.findOne().sort({ createdAt: -1 });
    if (lastComment) {
      post.lastComment = lastComment;
      await post.save({ timestamps: false });
    }
  }
};

export default run;
