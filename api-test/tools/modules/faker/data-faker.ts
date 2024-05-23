import { faker } from '@faker-js/faker';
import { user } from '../consts/user';
import { interactions } from '../consts/interactions';
const status = 'active';
const todo_status = 'completed';
export class DataFaker {
  private name: string;
  private email: string;
  private gender: string;
  private status: string;
  private title: string;
  private body: string;
  private due_on : string;
  private todo_status: string;
  constructor() {
    this.name = faker.person.fullName();
    this.email = faker.internet.email();
    this.gender = faker.person.sexType();
    this.status = status;
    this.title = faker.commerce.productName();
    this.body = faker.commerce.productDescription();
    this.due_on = faker.date.soon().toISOString();
    this.todo_status = todo_status;
   }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getGender(): string {
    return this.gender;
  }
  getStatus(): string {
    return this.status;
  }
  getTitle(): string {
    return this.title;
  }
  getBody(): string {
    return this.body;
  }
  getDate(): string {
    return this.due_on;
  }
  getTodoStatus(): string {
    return this.todo_status;
  }
  getPost(): Map<string, any> {
    const response = new Map<string, any>();
    response.set(interactions.TITLE, this.getTitle());
    response.set(interactions.BODY, this.getBody());
    return response;
  }
  getComments(): Map<string, any> {
    const response = new Map<string, any>();
    response.set(user.NAME, this.getName());
    response.set(user.EMAIL, this.getEmail());
    response.set(interactions.BODY, this.getBody());
    return response;
  }
  getTodos(): Map<string, any> {
    const response = new Map<string, any>();
    response.set(interactions.TITLE, this.getTitle());
    response.set(interactions.DUE_ON, this.getDate());
    response.set(user.STATUS, this.getTodoStatus());
    return response;
  }
  getAllUserData(): Map<string, any> {
    const response = new Map<string, any>();
    response.set(user.NAME, this.getName());
    response.set(user.EMAIL, this.getEmail());
    response.set(user.GENDER, this.getGender());
    response.set(user.STATUS, this.getStatus());
    return response;
  }
  getBasicUserData(): Map<string, any> {
    const response = new Map<string, any>();
    response.set(user.NAME, this.getName());
    response.set(user.EMAIL, this.getEmail());
    return response;
  }
}
