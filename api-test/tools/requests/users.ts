import path from 'path';
import { Domain_URL, getUserByUserId } from '../consts/paths';
import { setHeader } from '../request_bodies/header';
import { SOMETHING_WENT_WRONG } from '../consts/console-message';
import { APIRequestContext, APIResponse } from 'playwright/test';
import { user } from '../modules/consts/user';
import { userBody } from '../request_bodies/user';


export class User {
  private name?: string ;
  private email?: string;
  private gender?: string;
  private status?: string ;
  constructor(userInfoData?: Map<string, string>) {
    if(userInfoData){
    this.email = userInfoData.get(user.EMAIL);
    this.name = userInfoData.get(user.NAME);
    this.gender = userInfoData.get(user.GENDER);
    this.status = userInfoData.get(user.STATUS);
  }
  }
  async createNewUser(request: APIRequestContext, token: string, email: string | undefined = this.email, name: string | undefined = this.name,  gender: string | undefined  = this.gender , status: string | undefined = this.status ): Promise<APIResponse> {
    try {
      return await request.post(
        new URL(path.join(process.env.API_BASE_URL!, Domain_URL.POST_USER)).toString(),
        {
          headers: await setHeader(token),
          data: await userBody(
            email,
            name,
            gender,
            status
          ),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <createNewUser>: ${error}`);
    }
  }
  async editUser(request: APIRequestContext, token: string, id: number | any,  email: string | undefined = this.email, name: string | undefined = this.name,  gender: string | undefined  = this.gender , status: string | undefined = this.status ): Promise<APIResponse> {
    try {
      return await request.patch(
        new URL(
          path.join(process.env.API_BASE_URL!, getUserByUserId(id))
        ).toString(),
        {
          headers: await setHeader(token),
          data: await userBody(email, name, gender, status)
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <editUser>: ${error}`);
    }
  };
  
  async deleteUser(request: APIRequestContext, token: string, id: number | any): Promise<APIResponse> {
    try {
      return await request.delete(
        new URL(
          path.join(process.env.API_BASE_URL!, getUserByUserId(id!))
        ).toString(),
        {
          headers: await setHeader(token),
        }
      );
    } catch (error) {
      throw new Error(`${SOMETHING_WENT_WRONG} <deleteUser>: ${error}`);
    }
  };
  
}

export const getAllUsers = async (
  request: APIRequestContext,
  token: string,
): Promise<APIResponse> => {
  try {
    return await request.get(
      new URL(
        path.join(process.env.API_BASE_URL!, Domain_URL.GET_ALL_USERS)
      ).toString(),
      {
        headers: await setHeader(token),
      }
    );
  } catch (error) {
    throw new Error(`${SOMETHING_WENT_WRONG} <getAllUsers>: ${error}`);
  }
};

export const getUserById = async (
  request: APIRequestContext,
  token: string,
  id: number,
): Promise<APIResponse> => {
  try {
    return await request.get(
      new URL(
        path.join(process.env.API_BASE_URL!, getUserByUserId(id))
      ).toString(),
      {
        headers: await setHeader(token),
      }
    );
  } catch (error) {
    throw new Error(`${SOMETHING_WENT_WRONG} <getUserById>: ${error}`);
  }
};
