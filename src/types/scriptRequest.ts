export type ScriptRequest = {
    prebuildType?: "express";
    framework?: "node" | "react" | "next";
    scripts?: Map<string, string>;
    prodDependencies?: string[];
    devDependencies?: string[];
    envVars?: Map<string, string>;
  };