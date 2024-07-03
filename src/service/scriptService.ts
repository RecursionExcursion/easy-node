"use server";

import { getAuthHeader, refreshApiTokenCookie } from "../lib/requestHandler";
import { ENDPOINT } from "../constants/paths";

type PostScriptParams = {
  type: "express";
};

export const getScript = async () => {
  const res = await fetch(ENDPOINT + "/script", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      ...(await getAuthHeader()),
    },
  });

  return await res.json();
};

export const postScript = async (params: PostScriptParams) => {
  let res = await scriptFetch(params);

  if (res.status === 403) {
    await refreshApiTokenCookie();
    res = await scriptFetch(params);
  }

  if (res.ok) {
    return await res.json();
  }

  return null;
};

const scriptFetch = async (params: PostScriptParams) => {
  return fetch(ENDPOINT + "/script", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(params),
    headers: {
      ...(await getAuthHeader()),
      "Content-Type": "application/json",
    },
  });
};
