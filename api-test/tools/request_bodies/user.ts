interface userBody {
    email?: string;
    name?: string;
    gender?: string;
    status?: string;
  }
  export const userBody = async (email?: string, name?: string, gender?: string, status?: string): Promise<userBody> => {
    return {
        email,
        name,
        gender,
        status
    };
  };
  