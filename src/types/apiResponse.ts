export type ScriptRequest = {
  prebuildType?: "string";
  framework?: string;
  scripts?: Map<string, string>;
  prodDependencies?: string[];
  devDependencies?: string[];
  envVars?: Map<string, string>;
};

export type Service = {
  runtime: string;
  libraries: string[];
};
