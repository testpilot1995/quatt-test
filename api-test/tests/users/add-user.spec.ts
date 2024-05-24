import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User, getAllUsers, getUserById } from '../../tools/requests/users';
import { genders} from '../../tools/test_data/gender';
import {states} from '../../tools/test_data/status';

let dataFaker: DataFaker;
let name: string;
let email:string ;
const token = process.env.BEARER_TOKEN!;
test.describe('API-POST:', async() => {
test.beforeEach(async () => {
  dataFaker = new DataFaker();
  name = dataFaker.getName();
  email = dataFaker.getEmail();
});  
for (const status of states) {
  for (const gender of genders) {
  const API_TEST1 = `Try add new user successfully when user gender is ${gender.userGender} and user status is ${status.userStatus}`;
  test(API_TEST1, async ({ request }) => {
    const addNewUser = await new User().createNewUser(request, token, email, name,  gender.userGender, status.userStatus);
    expect(addNewUser.status()).toBe(201);
    const newUserResponse = await addNewUser.json();
    const userId = newUserResponse.id;
    const getUser = await getUserById(request, token, userId)
    expect(getUser.status()).toBe(200);
    const getUserResponse = await getUser.json()
    expect(getUserResponse.name).toBe(name);
    expect(getUserResponse.email).toBe(email);
    expect(getUserResponse.gender).toBe(gender.userGender);
    expect(getUserResponse.status).toBe(status.userStatus);
    const getAllUser = await getAllUsers(request,token);
    const userArray : any [] = await getAllUser.json();
    const user = userArray.find((user) => user.id == userId);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.gender).toBe(gender.userGender);
    expect(user.status).toBe(status.userStatus);
  });
}
}
});