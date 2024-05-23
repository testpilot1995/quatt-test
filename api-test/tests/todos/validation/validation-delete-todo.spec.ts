import { expect, test } from '@playwright/test';
import { Todos } from '../../../tools/requests/todos';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
const token = process.env.BEARER_TOKEN!;
for (const invalidData of invalidUserData) {
    const API_TEST1 = `Try add new todo when title is ${invalidData.data}`
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new Todos().deleteTodo(request, token, invalidData.data);
    expect(addNewPost.status()).toBe(404);
  }); 
}