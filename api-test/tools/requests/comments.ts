import path from 'path';
import { Domain_URL, getPostById, getUserByUserId } from '../consts/paths';
import { setHeader } from '../request_bodies/header';
import { SOMETHING_WENT_WRONG } from '../consts/console-message';
import { APIRequestContext, APIResponse } from 'playwright/test';
import { user } from '../modules/consts/user';
import { interactions } from '../modules/consts/interactions';
import { commentBody } from '../request_bodies/comment';


export class Comments {
  private name?: string ;
  private email?: string;
  private body?: string;

  constructor(commentData?: Map<string, string>) {
    if(commentData){
    this.email = commentData.get(user.EMAIL);
    this.name = commentData.get(user.NAME);
    this.body = commentData.get(interactions.BODY);
  }
  }
  async createNewComment(request: APIRequestContext, token: string, post_id: number | any , email: string | undefined = this.email, name: string | undefined = this.name,  body: string | undefined  = this.body): Promise<APIResponse> {
    try {
      return await request.post(
        new URL(path.join(process.env.API_BASE_URL!, getPostById(post_id!), Domain_URL.COMMENTS)).toString(),
        {
          headers: await setHeader(token),
          data: await commentBody(
            post_id!,
            email,
            name,
            body,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <createNewComment>: ${error}`);
    }
  }
  async editComment(request: APIRequestContext, token: string, post_id: number | any , commentId: number | undefined, email: string | undefined = this.email, name: string | undefined = this.name,  body: string | undefined  = this.body): Promise<APIResponse> {
    try {
      return await request.patch(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.COMMENTS, commentId!.toString())).toString(),
        {
          headers: await setHeader(token),
          data: await commentBody(
            post_id!,
            email,
            name,
            body,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <editComment>: ${error}`);
    }
  }
  async deleteComment(request: APIRequestContext, token: string,  commentId: number | any
  ): Promise<APIResponse> {
    try {
      return await request.patch(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.COMMENTS, commentId.toString())).toString(),
        {
          headers: await setHeader(token),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <deleteComment>: ${error}`);
    }
  }
  async getComments(request: APIRequestContext, token: string): Promise<APIResponse> {
    try {
      return await request.get(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.COMMENTS)).toString(),
        {
          headers: await setHeader(token)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <getComments>: ${error}`);
    }
  }
}
