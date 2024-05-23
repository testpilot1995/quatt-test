export const setHeader = async (bearerToken: string) => {
    return bearerToken
      ? {
          Authorization: `Bearer ${bearerToken}`,
        }
      : undefined;
  };
  