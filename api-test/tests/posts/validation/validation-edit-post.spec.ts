import { expect, test } from '@playwright/test';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
import { User } from '../../../tools/requests/users';
import { Posts } from '../../../tools/requests/posts';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let title: string;
let post: Posts;
let body : string;
let postId: number;
const token = process.env.BEARER_TOKEN!;
test.describe('API-VALIDATION-PATCH:', async() => {
  
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  post = new Posts(dataFaker.getPost());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  const addNewPost = await post.createNewPost(request, token, userId);
  const addNewPostResponse = await addNewPost.json();
  postId = addNewPostResponse.id;
});  
for (const invalidData of invalidUserData) {
    const API_TEST1 = `Try add new post when title is ${invalidData.data}`
    const API_TEST2 = `Try add new comment when body is ${invalidData.data}`
    const API_TEST3 = `Try add new comment when postId is ${invalidData.data}`

  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new Posts().editPost(request, token, postId, invalidData.data, body);
    expect(addNewPost.status()).toBe(422);
  }); 
  test(API_TEST2, async ({ request }) => {
    const addNewPost = await new Posts().editPost(request, token, postId, title, invalidData.data);
    expect(addNewPost.status()).toBe(422);
  }); 
  test(API_TEST3, async ({ request }) => {
    const addNewPost = await new Posts().editPost(request, token, invalidData.data, title, invalidData.data);
    switch (addNewPost.status().valueOf()) {
      case 404:
        expect(addNewPost.status()).toBe(404);
        break;
      case 422:
        expect(addNewPost.status()).toBe(422);
        break;
      default:
        test.fail();
        break;
    }
  }); 
}
}); 