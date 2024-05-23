import { expect, test } from '@playwright/test';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
import { User } from '../../../tools/requests/users';
import { Posts } from '../../../tools/requests/posts';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let title: string;
let body : string;
const token = process.env.BEARER_TOKEN!;
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
});  
for (const invalidData of invalidUserData) {
    const API_TEST1 = `Try add new post when title is ${invalidData.data}`
    const API_TEST2 = `Try add new comment when body is ${invalidData.data}`
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new Posts().createNewPost(request, token, userId, invalidData.data, body);
    expect(addNewPost.status()).toBe(422);
  }); 
  test(API_TEST2, async ({ request }) => {
    const addNewPost = await new Posts().createNewPost(request, token, userId, title, invalidData.data);
    expect(addNewPost.status()).toBe(422);
  }); 
}