"use client";

const useFileDownload = () => {
  const downloadFile = (
    data: string,
    blobType: BlobPropertyBag["type"],
    fileName: string
  ) => {
    const blob = new Blob([data], {
      type: blobType,
    });

    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${fileName as string}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };

  return { downloadFile };
};

export default useFileDownload;
