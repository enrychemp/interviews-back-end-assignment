import { faker } from "@faker-js/faker";
import postModel from "../api/post/post.model";
import commentModel, {
  IComment,
  CommentDocument,
} from "../api/comment/comment.model";

const run = async (reset, nPost = 10) => {
  if (reset) {
    // reset collections
    await postModel.deleteMany();
    await commentModel.deleteMany();
  }
  // create n posts
  for (let i = 0; i < nPost; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 5 });
    const body = faker.lorem.lines({ min: 4, max: 10 });
    const createdAt = faker.date.past();
    const updatedAt = faker.date.past();
    const post = new postModel({ title, body, createdAt, updatedAt });
    // save a post
    await post.save();

    // get random number from 0 to 50 comments
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

    // get recent comment by related postId
    const lastComment = await commentModel
      .findOne({ postId: post._id })
      .sort({ createdAt: -1 });
    if (lastComment) {
      // set lastComment object
      post.lastComment = lastComment;
      // save post without update timestamps
      await post.save({ timestamps: false });
    }
  }
};

export default run;
