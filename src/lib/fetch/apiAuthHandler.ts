"use server";

import endpoints from "../../constants/endpoints";
import { getCookie, setCookie } from "../cookieManager";

type AuthHeaders = {
  [key: string]: string;
};

export const getApiRequestInit = async () => {
  const authHeaders: AuthHeaders = await createAuthHeader();

  const init: RequestInit = {
    mode: "cors",
    credentials: "include",
    headers: {
      ...authHeaders,
    },
  };

  return init;
};

export const createAuthHeader = async () => {
  let cookie = await getCookie({ cookie: "apiToken" });

  if (!cookie) {
    await refreshApiTokenCookie();
    cookie = await getCookie({ cookie: "apiToken" });
  }

  return {
    authorization: "Bearer " + cookie?.value,
  };
};

export const fetchApiToken = async () => {
  const apiKey = process.env.API_KEY ?? "";

  const res = await fetch(endpoints.auth, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "x-api-key": apiKey,
    },
  });

  const { accessToken } = await res.json();

  return accessToken;
};

export const refreshApiTokenCookie = async () => {
  const token = await fetchApiToken();

  await setCookie({
    cookie: "apiToken",
    value: token,
    exp: 1000 * 60 * 60 * 24,
  });
};
