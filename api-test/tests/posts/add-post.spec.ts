import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User} from '../../tools/requests/users';
import { Posts } from '../../tools/requests/posts';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let post: Posts;
let title: string;
let body : string;
const API_TEST1 = `Add new post for a user which has added earlier`
const token = process.env.BEARER_TOKEN!;
test.describe('API-POST:', async() => {

test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  post = new Posts(dataFaker.getPost());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  title = dataFaker.getTitle();
  body = dataFaker.getBody();
});  
  test(API_TEST1, async ({ request }) => {
    const addNewPost = await post.createNewPost(request, token, userId);
    const aaddNewPostResponse = await addNewPost.json();
    const postId= aaddNewPostResponse.id;
    const getPost = await post.getPosts(request,token);
    const todoArray : any [] = await getPost.json();
    const addedPost = todoArray.find((post) => post.id === postId);
    expect(addedPost.user_id).toBe(userId);
    expect(addedPost.title).toBe(title);
    expect(addedPost.body).toBe(body);
  });
});