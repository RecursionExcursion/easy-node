"use server";

import { cookies } from "next/headers";

const clientCookies = {
  apiToken: "apiToken",
};

type GetCookieParams = {
  cookie: keyof typeof clientCookies;
};

export const getCookie = async (params: GetCookieParams) => {
  const { cookie } = params;
  return cookies().get(cookie);
};

type SetCookieParams = GetCookieParams & {
  value: string;
  exp?: number;
};

export const setCookie = async (params: SetCookieParams) => {
  const { cookie, value } = params;

  cookies().set(cookie, value, {
    expires: Date.now() + (params.exp ?? 1000 * 60 * 60 * 24),
    httpOnly: true,
    sameSite: "lax",
  });
};
