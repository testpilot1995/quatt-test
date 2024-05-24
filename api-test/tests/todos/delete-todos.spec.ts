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
let todoId: number;
const API_TEST1 = `Add new todo for a user which has added earlier and delete it last successfully`
const token = process.env.BEARER_TOKEN!;
test.describe('API-DELETE:', async() => {
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
  status = dataFaker.getTodoStatus();
});  
  test(API_TEST1, async ({ request }) => {
    const addNewTodo = await new Todos().deleteTodo(request, token, todoId);
    expect(addNewTodo.status()).toBe(204);
    const getTodos = await todo.getTodos(request,token);
    const getTodosResponse = await getTodos.json();
    expect(getTodosResponse.includes(userId)).toBe(false);
    expect(getTodosResponse.includes(title)).toBe(false);
    expect(getTodosResponse.includes(status)).toBe(false);
    expect(getTodosResponse.includes(await convertTime(due_on))).toBe(false);
  });
});