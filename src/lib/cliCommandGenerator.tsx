export const createNodePackageCliCommand = (
  dependencies: Set<string>,
  type: "prod" | "dev"
) => {
  switch (type) {
    case "prod":
      return `npm i ${Array.from(dependencies).join(" ")}`;
    case "dev":
      return `npm i ${Array.from(dependencies).join(" ")} -D`;
  }
};
