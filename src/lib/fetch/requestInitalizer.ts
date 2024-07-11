import { getApiRequestInit } from "./apiAuthHandler";

export const postRequestInit = async (params: Object) => {
  const baseReqInit = await getApiRequestInit();

  const reqInit: RequestInit = {
    ...baseReqInit,
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      ...baseReqInit.headers,
      "Content-Type": "application/json",
    },
  };

  return reqInit;
};
