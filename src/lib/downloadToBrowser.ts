"use client";

const downloadToBrowser = (Content: string, fileName: string) => {
  const el = document.createElement("a");
  const blob = new Blob([Content], { type: "text/plain" });
  el.href = URL.createObjectURL(blob);
  el.download = fileName;
  el.click();
};

export default downloadToBrowser;
