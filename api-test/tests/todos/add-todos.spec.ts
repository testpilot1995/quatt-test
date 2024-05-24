import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User} from '../../tools/requests/users';
import { Todos } from '../../tools/requests/todos';
import { convertTime } from '../../tools/modules/shared/time-convert';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let todo: Todos;
let title: string;
let due_on : string;
let status: string;
const API_TEST1 = `Add new todo for a user which has added earlier`
const token = process.env.BEARER_TOKEN!;
test.describe('API-POST:', async() => {
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  todo = new Todos(dataFaker.getTodos());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  title = dataFaker.getTitle();
  due_on = dataFaker.getDate();
  status = dataFaker.getTodoStatus();
});  
  test(API_TEST1, async ({ request }) => {
    const addNewTodo = await todo.createNewTodo(request, token, userId);
    expect(addNewTodo.status()).toBe(201);
    const addNewTodoResponse = await addNewTodo.json();
    const todoId = addNewTodoResponse.id;
    const getTodos = await todo.getTodos(request,token);
    const todoArray : any [] = await getTodos.json();
    const todoItem = todoArray.find((item) => item.id === todoId);
    expect(todoItem.user_id).toBe(userId);
    expect(todoItem.title).toBe(title);
    expect(todoItem.status).toBe(status);
    expect(await convertTime(todoItem.due_on)).toBe(await convertTime(due_on));
  });
});