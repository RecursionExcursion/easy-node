"use server";

type LogType = "log" | "warn" | "error";

export const logToServer = async (text: string, type: LogType) => {
  console[type](text);
};
