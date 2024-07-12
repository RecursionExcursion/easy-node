"use server";

import endpoints from "../constants/endpoints";
import { postRequestInit } from "../lib/fetch/requestInitalizer";
import { ScriptRequest } from "../types/apiResponse";

export const postCliCommand = async (params: ScriptRequest) => {
  const res = await cliFetch(params);

  if (!res.ok) {
    return null;
  }

  const commandArray = await res.json();

  return isStringArray(commandArray) ? commandArray : null;
};

const cliFetch = async (params: ScriptRequest) => {
  const init = await postRequestInit(params);
  return await fetch(endpoints.scriptCli, init);
};

const isStringArray = (arr: any): arr is string[] => {
  return (
    Array.isArray(arr) && arr.every((item: any) => typeof item === "string")
  );
};
