import { expect, test } from '@playwright/test';
import { DataFaker } from '../../../tools/modules/faker/data-faker';
import { Comments } from '../../../tools/requests/comments';
import { Posts } from '../../../tools/requests/posts';
import { User } from '../../../tools/requests/users';
import { invalidCommentData, invalidUserData } from '../../../tools/test_data/invalid-data';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let comment: Comments;
let name: string;
let email: string;
let post: Posts;
let body : string;
let postId: number;
let commentId: number;
const token = process.env.BEARER_TOKEN!;
test.beforeEach(async ({request}) => {
  dataFaker = new DataFaker();
  user = new User(dataFaker.getAllUserData())
  comment = new Comments(dataFaker.getComments());
  post = new Posts(dataFaker.getPost());
  const addNewUser = await user.createNewUser(request, token);
  const newUserResponse = await addNewUser.json();
  userId = newUserResponse.id;
  const addNewPost = await post.createNewPost(request, token, userId);
  const adNewPostResponse = await addNewPost.json();
  postId = adNewPostResponse.id;
  const addNewComment = await comment.createNewComment(request, token, postId);
  const addNewCommentResponse = await addNewComment.json();
  commentId = addNewCommentResponse.id;
  name = dataFaker.getName();
  email = dataFaker.getEmail();
  body = dataFaker.getBody();
});  
for (const invalidData of invalidCommentData) {
    const API_TEST1 = `Try add new comment successfully and edit when name is ${invalidData.data}`
    const API_TEST2 = `Try add new comment successfully and edit when email is ${invalidData.data}`
    const API_TEST3 = `Try add new comment successfully and edit when body is ${invalidData.data}`

  test(API_TEST1, async ({ request }) => {
    const editComment = await new Comments().editComment(request, token, postId, commentId, invalidData.data, name, body);
    expect(editComment.status()).toBe(422)
  });
  test(API_TEST2, async ({ request }) => {
    const editComment = await new Comments().editComment(request, token, postId, commentId, email, invalidData.data, body);
    expect(editComment.status()).toBe(422)
  });
  test(API_TEST3, async ({ request }) => {
    const editComment = await new Comments().editComment(request, token, postId, commentId, email, name, invalidData.data);
    expect(editComment.status()).toBe(422)
  });
}
for (const invalidData of invalidUserData) {
    const API_TEST4 = `Try add new comment successfully and edit when postId is ${invalidData.data}`
    test(API_TEST4, async ({ request }) => {
        const editComment = await new Comments().editComment(request, token, invalidData.data, commentId, email, name, body);
        switch (editComment.status().valueOf()) {
          case 404:
            expect(editComment.status()).toBe(404);
            break;
          case 422:
            expect(editComment.status()).toBe(422);
            break;
          default:
            test.fail();
            break;
        }  
   });
}