interface commentBody {
    post_id?: number;
    name?: string;
    email?: string;
    body?: string;
  }
  export const commentBody = async (post_id?: number, email?: string, name?: string, body?: string): Promise<commentBody> => {
    return {
        post_id,
        name,
        email,
        body
    };
  };
  