"use server";

import { ENDPOINT } from "../constants/paths";
import { getCookie, setCookie } from "./cookieManager";

export const getAuthHeader = async () => {
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

  const url = ENDPOINT + "/auth";

  const res = await fetch(url, {
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
