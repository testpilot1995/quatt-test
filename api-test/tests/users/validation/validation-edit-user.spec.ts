import { expect, test } from '@playwright/test';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
import { User } from '../../../tools/requests/users';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let newName : string;
let newEmail: string;
let newGender: string;
let newStatus: string;
const token = process.env.BEARER_TOKEN!;
test.describe('API-PATCH-VALIDATION:', async() => {
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  newName = dataFaker.getName();
  newEmail = dataFaker.getEmail();
  newGender = dataFaker.getGender();
  newStatus = dataFaker.getStatus();
});  
for (const invalidData of invalidUserData) {
    const API_TEST1 = `Add new user and try edit name by ${invalidData.data}`
    const API_TEST2 = `Add new user and try edit email by ${invalidData.data}`
    const API_TEST3 = `Add new user and try edit gender by ${invalidData.data}`
    const API_TEST4 = `Add new user and try edit status by ${invalidData.data}`
    const API_TEST5 = `Add new user and try edit userId by ${invalidData.data}`

  test(API_TEST1, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, userId, invalidData.data, newEmail, newGender, newStatus);
    expect(editUserRequest.status()).toBe(422);
  });
  test(API_TEST2, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, userId, newName, invalidData.data, newGender, newStatus);
    expect(editUserRequest.status()).toBe(422);
  });
  test(API_TEST3, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, userId, newName, newEmail, invalidData.data, newStatus);
    expect(editUserRequest.status()).toBe(422);
  });
  test(API_TEST4, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, userId, newName, newEmail, newGender, invalidData.data);
    expect(editUserRequest.status()).toBe(422);
  });
  test(API_TEST5, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, invalidData.data, newName, newEmail, newGender, invalidData.data);
    switch (editUserRequest.status().valueOf()) {
      case 404:
        expect(editUserRequest.status()).toBe(404);
        break;
      case 422:
        expect(editUserRequest.status()).toBe(422);
        break;
      default:
        test.fail();
        break;
    } 
   });
}
});