import { expect, test } from '@playwright/test';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
import { User } from '../../../tools/requests/users';
import { invalidUserData } from '../../../tools/test_data/invalid-data';
let dataFaker: DataFaker;
let userName : string;
let userEmail: string;
let userGender: string;
let userStatus: string;
let user: User;
const API_TEST5 = `Try add same user multiple times`
const token = process.env.BEARER_TOKEN!;
test.describe('API-POST-VALIDATION:', async() => {
test.beforeEach(async () => {
  dataFaker = new DataFaker();
  userName = dataFaker.getName();
  userEmail = dataFaker.getEmail();
  userGender = dataFaker.getGender();
  userStatus = dataFaker.getStatus();
});  
for (const invalidData of invalidUserData) {
  const API_TEST1 = `Try add new user when email is ${invalidData.data}`
  const API_TEST2 = `Try add new user when name is ${invalidData.data}`
  const API_TEST3 = `Try add new user when gender is ${invalidData.data}`
  const API_TEST4 = `Try add new user when status is ${invalidData.data}`

test(API_TEST1, async ({ request }) => {
  const addNewUser = await new User().createNewUser(request,token, invalidData.data, userName, userGender, userStatus)
  expect(addNewUser.status()).toBe(422);
});
test(API_TEST2, async ({ request }) => {
  const addNewUser = await new User().createNewUser(request,token, userEmail, invalidData.data, userGender, userStatus)
  expect(addNewUser.status()).toBe(422);
});
test(API_TEST3, async ({ request }) => {
  const addNewUser = await new User().createNewUser(request,token, userEmail, userName, invalidData.data, userStatus)
  expect(addNewUser.status()).toBe(422);
});
test(API_TEST4, async ({ request }) => {
  const addNewUser = await new User().createNewUser(request,token, userEmail, userName, userGender, invalidData.data)
  expect(addNewUser.status()).toBe(422);
});
}
test(API_TEST5, async ({ request }) => {
  user = new User(dataFaker.getAllUserData());
  const addNewUserFirst = await user.createNewUser(request,token);
  expect(addNewUserFirst.status()).toBe(201);
  const addNewUserSecond = await user.createNewUser(request,token);
  expect(addNewUserSecond.status()).toBe(422);
});
});
