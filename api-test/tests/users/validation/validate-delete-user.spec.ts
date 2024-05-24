import { expect, test } from '@playwright/test';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
import { User } from '../../../tools/requests/users';

const token = process.env.BEARER_TOKEN!;
test.describe('API-DELETE-VALIDATION:', async() => {
  
for (const invalidData of invalidUserData) {
    const API_TEST1 = `Try delete user when userId is: ${invalidData.data}`
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await new User().deleteUser(request, token, invalidData.data)
    expect(addNewPost.status()).toBe(404);
  }); 
}
}); 