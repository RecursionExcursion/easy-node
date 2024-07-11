// export const ENDPOINT = process.env.PROD_API_ENDPOINT ?? "";
const ENDPOINT = process.env.DEV_API_ENDPOINT ?? "";

const script = ENDPOINT + "/script";
const scriptServices = ENDPOINT + "/script/services";
const scriptCli = ENDPOINT + "/script/cli";

const auth = ENDPOINT + "/auth";

const npmRegistry = "https://registry.npmjs.org/";

const endpoints = {
  script,
  scriptServices,
  scriptCli,
  npmRegistry,
  auth
};

export default endpoints;
