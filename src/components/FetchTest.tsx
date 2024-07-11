"use client";

import useFileDownload from "../app/hooks/useFileDownload";
import { fetchApiToken } from "../lib/fetch/apiAuthHandler";
import { getScript, postScript } from "../service/scriptService";

export default function FetchTest() {
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
    // postScript({ type: "express" }).then((resObj) => {
    //   const { text, fileName } = resObj;

    //   downloadFile(
    //     text as string,
    //     "application/javascript",
    //     fileName as string
    //   );
    // });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={() => handleAuth()}>Local Auth</button>
      <button onClick={() => handleGet()}>Local Get</button>
      <button onClick={() => handleDownload()}>Local Dl</button>
    </div>
  );
}
