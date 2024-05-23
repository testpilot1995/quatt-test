interface todosBody {
    title?: string;
    due_on?: string;
    status?: string;
  }
  export const todosBody = async (title?: string, due_on?: string, status?: string): Promise<todosBody> => {
    return {
        title,
        due_on,
        status
    };
  };
  