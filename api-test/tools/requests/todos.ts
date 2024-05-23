import path from 'path';
import { Domain_URL, getUserByUserId } from '../consts/paths';
import { setHeader } from '../request_bodies/header';
import { SOMETHING_WENT_WRONG } from '../consts/console-message';
import { APIRequestContext, APIResponse } from 'playwright/test';
import { user } from '../modules/consts/user';
import { interactions } from '../modules/consts/interactions';
import { todosBody } from '../request_bodies/todos';


export class Todos {
  private title?: string ;
  private due_on?: string;
  private status?: string;

  constructor(todosData?: Map<string, string>) {
    if(todosData){
    this.title = todosData.get(interactions.TITLE);
    this.due_on = todosData.get(interactions.DUE_ON);
    this.status = todosData.get(user.STATUS);
  }
  }
  async createNewTodo(request: APIRequestContext, token: string, id: number, title: string | undefined  = this.title, due_on: string | undefined  = this.due_on , status: string | undefined  = this.status): Promise<APIResponse> {
    try {
      return await request.post(
        new URL(path.join(process.env.API_BASE_URL!, getUserByUserId(id), Domain_URL.TODOS)).toString(),
        {
          headers: await setHeader(token),
          data: await todosBody(
            title,
            due_on,
            status,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <createNewTodo>: ${error}`);
    }
  }
  async editTodos(request: APIRequestContext, token: string, id: number | any, title: string | undefined  = this.title, due_on: string | undefined  = this.due_on , status: string | undefined  = this.status): Promise<APIResponse> {
    try {
      return await request.patch(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.TODOS, id!.toString())).toString(),
        {
          headers: await setHeader(token),
          data: await todosBody(
            title,
            due_on,
            status,
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <editTodos>: ${error}`);
    }
  }
  async deleteTodo(request: APIRequestContext, token: string, id: number | any): Promise<APIResponse> {
    try {
      return await request.delete(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.TODOS, id!.toString())).toString(),
        {
          headers: await setHeader(token)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <deleteTodo>: ${error}`);
    }
  }
  async getTodos(request: APIRequestContext, token: string): Promise<APIResponse> {
    try {
      return await request.get(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.PUBLIC_V2, Domain_URL.TODOS)).toString(),
        {
          headers: await setHeader(token)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <getTodos>: ${error}`);
    }
  }
}
