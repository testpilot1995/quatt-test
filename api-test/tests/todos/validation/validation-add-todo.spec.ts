import { expect, test } from '@playwright/test';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
import { User } from '../../../tools/requests/users';
import { Todos } from '../../../tools/requests/todos';
import { invalidCommentData, invalidDateData, invalidUserData } from '../../../tools/test_data/invalid-data';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let title: string;
let due_on : string;
let status: string;
const token = process.env.BEARER_TOKEN!;
test.describe('API-POST-VALIDATION:', async() => {
  
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  title = dataFaker.getTitle();
  due_on = dataFaker.getDate();
  status = dataFaker.getStatus();
});  
for (const invalidData of invalidCommentData) {
    const API_TEST1 = `Try add new todo when title is ${invalidData.data}`
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new Todos().createNewTodo(request, token, userId, invalidData.data, due_on, status);
    expect(addNewPost.status()).toBe(422);
  }); 
}
for (const invalidData of invalidUserData) {
  const API_TEST2 = `Try add new todo when status is ${invalidData.data}`
  test(API_TEST2, async ({ request }) => {
  const addNewPost = await new Todos().createNewTodo(request, token, userId, title, invalidData.data, status);
  expect(addNewPost.status()).toBe(422);
}); 
}
for (const invalidData of invalidDateData) {
  const API_TEST3 = `Try add new todo when date is ${invalidData.data}`
test(API_TEST3, async ({ request }) => {
  const addNewPost = await new Todos().createNewTodo(request, token, userId, title, invalidData.data, status);
  expect(addNewPost.status()).toBe(422);
}); 
}
}); 