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
let postId: number;
const API_TEST1 = `Add new comment for a user which has added earlier`
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
  name = dataFaker.getName();
  email = dataFaker.getEmail();
  body = dataFaker.getBody();
});  
  test(API_TEST1, async ({ request }) => {
    const addNewComment = await comment.createNewComment(request, token, postId);
    expect(addNewComment.status()).toBe(201)
    const addNewCommentResponse = await addNewComment.json();
    const commentId = addNewCommentResponse.id;
    const getPost = await comment.getComments(request,token);
    const commentArray : any [] = await getPost.json();
    const addedComment = commentArray.find((comment) => comment.id === commentId);
    expect(addedComment.post_id).toBe(postId);
    expect(addedComment.name).toBe(name);
    expect(addedComment.email).toBe(email);
    expect(addedComment.body).toBe(body);
  });