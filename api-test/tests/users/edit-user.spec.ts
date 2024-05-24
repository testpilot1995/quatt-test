import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User, getAllUsers} from '../../tools/requests/users';
import { states } from '../../tools/test_data/status';
import { genders } from '../../tools/test_data/gender';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let newName : string;
let newEmail: string;
const token = process.env.BEARER_TOKEN!;
test.describe('API-PATCH:', async() => {
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  newName = dataFaker.getName();
  newEmail = dataFaker.getEmail();
});  
for (const status of states) {
  for (const gender of genders) {
    const API_TEST1 = `Add new user successfully and after try to change sucessfully name , email, and usergender to: ${gender.userGender} and status to : ${status.userStatus}`
  test(API_TEST1, async ({ request }) => {
    const editUserRequest = await new User().editUser(request, token, userId, newEmail, newName, gender.userGender, status.userStatus);
    expect(editUserRequest.status()).toBe(200);
    const getAllUser = await getAllUsers(request,token);
    const userArray : any [] = await getAllUser.json();
    const user = userArray.find((user) => user.id == userId);
    expect(user.name).toBe(newName);
    expect(user.email).toBe(newEmail);
    expect(user.gender).toBe(gender.userGender);
    expect(user.status).toBe(status.userStatus);
  });
}
}
});