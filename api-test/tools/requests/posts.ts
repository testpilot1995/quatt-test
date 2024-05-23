import path from 'path';
import { Domain_URL, getUserByUserId } from '../consts/paths';
import { setHeader } from '../request_bodies/header';
import { SOMETHING_WENT_WRONG } from '../consts/console-message';
import { APIRequestContext, APIResponse } from 'playwright/test';
import { interactions } from '../modules/consts/interactions';
import { postBody } from '../request_bodies/posts';


export class Posts {
  private title?: string ;
  private body?: string;

  constructor(postData?: Map<string, string>) {
    if(postData){
    this.title = postData.get(interactions.TITLE);
    this.body = postData.get(interactions.BODY);
  }
  }
  
  async createNewPost(request: APIRequestContext, token: string, id:number | undefined, title: string | undefined  = this.title, body: string | undefined  = this.body): Promise<APIResponse> {
    try {
      return await request.post(
        new URL(path.join(process.env.API_BASE_URL!, getUserByUserId(id!), Domain_URL.POSTS)).toString(),
        {
          headers: await setHeader(token),
          data: await postBody(
            title,
            body,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <createNewPost>: ${error}`);
    }
  }
  async editPost(request: APIRequestContext, token: string, id:number | any, title: string | undefined  = this.title, body: string | undefined  = this.body): Promise<APIResponse> {
    try {
      return await request.patch(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.POSTS, id!.toString())).toString(),
        {
          headers: await setHeader(token),
          data: await postBody(
            title,
            body,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <editPost>: ${error}`);
    }
  }
  async deletePost(request: APIRequestContext, token: string, id: number | any): Promise<APIResponse> {
    try {
      return await request.delete(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.POSTS, id.toString())).toString(),
        {
          headers: await setHeader(token)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <deletePost>: ${error}`);
    }
  }
  async getPosts(request: APIRequestContext, token: string): Promise<APIResponse> {
    try {
      return await request.get(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.POSTS)).toString(),
        {
          headers: await setHeader(token)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <getPosts>: ${error}`);
    }
  }
}
