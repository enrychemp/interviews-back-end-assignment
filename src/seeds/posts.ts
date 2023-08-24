import { faker } from "@faker-js/faker";
import postModel from "../api/post/post.model";

const run = async (reset) => {
  if (reset) {
    await postModel.deleteMany();
  }
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence({ min: 3, max: 5 });
    const body = faker.lorem.lines({ min: 4, max: 10 });
    const createdAt = faker.date.past();
    const updatedAt = faker.date.past();
    const post = new postModel({ title, body, createdAt, updatedAt });
    await post.save();
  }
};

export default run;
