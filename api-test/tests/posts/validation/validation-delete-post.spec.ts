import { expect, test } from '@playwright/test';
import { invalidCommentData } from '../../../tools/test_data/invalid-data';
import { Posts } from '../../../tools/requests/posts';
const token = process.env.BEARER_TOKEN!;
  
for (const invalidData of invalidCommentData) {
    const API_TEST1 = `Try delete  post when commentId is ${invalidData.data}`

  test(API_TEST1, async ({ request }) => {
    const deleteComment = await new Posts().deletePost(request, token, invalidData.data);
    expect(deleteComment.status()).toBe(404);
  });

}