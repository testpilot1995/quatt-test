import { expect, test } from '@playwright/test';
import { DataFaker } from '../../tools/modules/faker/data-faker';
import { User} from '../../tools/requests/users';
import { Comments } from '../../tools/requests/comments';
import { Posts } from '../../tools/requests/posts';
import { setHeader } from '../../tools/request_bodies/header';
let dataFaker: DataFaker;
let user: User;
let userId: number;
let comment: Comments;
let name: string;
let email: string;
let post: Posts;
let body : string;
let commentId: number;
let postId: number;
const API_TEST1 = `Add new comment for a user which has added earlier and at last edit it successfully`
const token = process.env.BEARER_TOKEN!;
test.describe('API-PATCH:', async() => {
  
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
  test(API_TEST1, async ({ request }) => {
    const editComment = await new Comments().editComment(request, token, postId, commentId, email, name, body);
    expect(editComment.status()).toBe(200);
    const getComment = await comment.getComments(request,token);
    const commentArray : any [] = await getComment.json();
    const editedComment = commentArray.find((comment) => comment.id === commentId);
    expect(editedComment.post_id).toBe(postId);
    expect(editedComment.name).toBe(name);
    expect(editedComment.email).toBe(email);
    expect(editedComment.body).toBe(body);
});
});