import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User, getAllUsers, getUserById } from '../../tools/requests/users';
import {NOT_FOUND} from '../../tools/consts/assertation-response';
let dataFaker: DataFaker;
let user: User;
let userId: number;
const API_TEST1 = `Add new user successfully and after delete it successfully`
const token = process.env.BEARER_TOKEN!;
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
});  
  test(API_TEST1, async ({ request }) => {
    const deleteUserRequest = await new User().deleteUser(request,token, userId)
    expect(deleteUserRequest.status()).toBe(204);
    const getUser = await getUserById(request,token, userId)
    expect(getUser.status()).toBe(404);
    const getUserResponse = await getUser.json();
    expect(getUserResponse.message).toBe(NOT_FOUND);
    const getAllUser = await getAllUsers(request,token);
    const getAllUserResponse = await getAllUser.json();
    expect(getAllUserResponse.includes(userId)).toBe(false);
  });