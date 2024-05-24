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
let todo: Todos;
let todoId : number;
const token = process.env.BEARER_TOKEN!;
test.describe('API-PATCH-VALIDATION:', async() => {
  
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  todo = new Todos(dataFaker.getTodos());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  const addNewTodo = await todo.createNewTodo(request, token, userId);
  const addNewTodoResponse = await addNewTodo.json();
  todoId = addNewTodoResponse.id;
  title = dataFaker.getTitle();
  due_on = dataFaker.getDate();
  status = dataFaker.getStatus();
});  
for (const invalidData of invalidCommentData) {
    const API_TEST1 = `Try add new todo when title is ${invalidData.data}`
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new Todos().editTodos(request, token, todoId, invalidData.data, due_on, status);
    expect(addNewPost.status()).toBe(422);
  }); 
}
for (const invalidData of invalidUserData) {
  const API_TEST2 = `Try add new todo when status is ${invalidData.data}`
  const API_TEST4 = `Try add new todo when todoId is ${invalidData.data}`
  test(API_TEST2, async ({ request }) => {
  const addNewPost = await new Todos().editTodos(request, token, todoId, title, invalidData.data, status);
  expect(addNewPost.status()).toBe(422);
}); 
test(API_TEST4, async ({ request }) => {
  const addNewPost = await new Todos().editTodos(request, token, invalidData.data, title, invalidData.data, status);
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
for (const invalidData of invalidDateData) {
  const API_TEST3 = `Try add new todo when date is ${invalidData.data}`
test(API_TEST3, async ({ request }) => {
  const addNewPost = await new Todos().editTodos(request, token, todoId, title, invalidData.data, status);
  expect(addNewPost.status()).toBe(422);
}); 
}
}); 