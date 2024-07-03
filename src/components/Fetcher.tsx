"use client";

import useFileDownload from "../app/hooks/useFileDownload";
import { fetchApiToken } from "../lib/requestHandler";
import { getScript, postScript } from "../service/scriptService";

export default function Fetcher() {
  const { downloadFile } = useFileDownload();

  const handleAuth = async () => {
    const token = await fetchApiToken();
    console.log({ token });
  };

  const handleGet = async () => {
    const get = await getScript();
    console.log({ get });
  };

  const handleDownload = async () => {
    postScript({ type: "express" }).then((resObj) => {
      const { text, fileName } = resObj;

      downloadFile(
        text as string,
        "application/javascript",
        fileName as string
      );
    });
  };

  return (
    <>
      <button onClick={() => handleAuth()}>Local Auth</button>
      <button onClick={() => handleGet()}>Local Get</button>
      <button onClick={() => handleDownload()}>Local Dl</button>

      {/* <button onClick={() => handleAuth(vercelAuthPath, "express")}>
        Vercel Auth
      </button>
      <button onClick={() => handleGet(vercelGetPath, "express")}>
        Vercel Get
      </button>{" "}
      <button onClick={() => handleDownload(vercelDlPath, "express")}>
        Vercel Dl
      </button> */}
    </>
  );
}
