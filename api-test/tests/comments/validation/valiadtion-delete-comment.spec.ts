import { expect, test } from '@playwright/test';
import { Comments } from '../../../tools/requests/comments';
import { invalidCommentData } from '../../../tools/test_data/invalid-data';
const token = process.env.BEARER_TOKEN!;
  
for (const invalidData of invalidCommentData) {
    const API_TEST1 = `Try delete  comment when commentId is ${invalidData.data}`

  test(API_TEST1, async ({ request }) => {
    const deleteComment = await new Comments().deleteComment(request, token, invalidData.data);
    expect(deleteComment.status()).toBe(404);
  });

}