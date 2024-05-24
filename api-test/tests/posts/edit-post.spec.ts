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
let postId: number;
const API_TEST1 = `Add new post for a user which has added earlier and edit it successfully`
const token = process.env.BEARER_TOKEN!;
test.describe('API-PATCH:', async() => {
  
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData());
  post = new Posts(dataFaker.getPost());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  const addNewPost = await post.createNewPost(request, token, userId);
  const aaddNewPostResponse = await addNewPost.json();
  postId = aaddNewPostResponse.id;
  title = dataFaker.getTitle();
  body = dataFaker.getBody();
});  
  test(API_TEST1, async ({ request }) => {
    const editPost = await post.editPost(request,token, postId, title, body);
    expect(editPost.status()).toBe(200);
    const getAllPost = await post.getPosts(request,token);
    const postArray : any [] = await getAllPost.json();
    const editedPost = postArray.find((post) => post.id === postId);
    expect(editedPost.user_id).toBe(userId);
    expect(editedPost.title).toBe(title);
    expect(editedPost.body).toBe(body);
  });
});