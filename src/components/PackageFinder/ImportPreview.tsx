"use client";

type ImportPreviewProps = {
  title: string;
  content: Set<string>;
};

export default function ImportPreview(props: ImportPreviewProps) {
  const { title, content } = props;

  return (
    <div className="pf-package-preview-container">
      <h3>{title}</h3>
      <div className="content-container">
        {content.size > 0 &&
          Array.from(content).map((dep, i) => (
            <div key={dep + i}>
              <p>{dep}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
