"use server";

import {
  getApiRequestInit,
  refreshApiTokenCookie,
} from "../lib/fetch/apiAuthHandler";
import { ENDPOINT } from "../constants/paths";
import { ScriptRequest } from "../types/scriptRequest";

type PostScriptParams = {
  type: "express";
};

export const getScript = async () => {
  const reqInit: RequestInit = {
    ...(await getApiRequestInit()),
    method: "GET",
  };

  const res = await fetch(ENDPOINT + "/script", reqInit);

  return await res.json();
};

export const postScript = async (params: ScriptRequest) => {
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

const scriptFetch = async (params: ScriptRequest) => {
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

  return fetch(ENDPOINT + "/script", reqInit);
};

export const getScriptGenInfo = async () => {
  const reqInit: RequestInit = {
    ...(await getApiRequestInit()),
    method: "GET",
  };

  const res = await fetch(ENDPOINT + "/script/info", reqInit);

  return await res.json();
};
