interface postBody {
    title?: string;
    body?: string;
  }
  export const postBody = async (title?: string, body?: string): Promise<postBody> => {
    return {
        title,
        body
    };
  };
  