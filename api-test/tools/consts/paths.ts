export enum Domain_URL {
    GET_ALL_USERS = '/public/v2/users',
    POST_USER = '/public/v2/users',
    POSTS = '/posts/',
    COMMENTS = '/comments/',
    TODOS = '/todos/',
    PUBLIC_V2 = '/public/v2'
  }
  
   export function getUserByUserId(userId: number) {
    return `/public/v2/users/${userId}`;
  }
  export function getPostById(userId: number) {
    return `/public/v2/posts/${userId}`;
  }