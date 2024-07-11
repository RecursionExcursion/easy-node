import { redirect } from "next/dist/server/api-utils";
import EasyNodeUI from "../../components/EasyNodeUI";
import { getScriptGenInfo } from "../../service/scriptService";

export default async function Home() {
  let services;
  try {
    services = await getScriptGenInfo();
  } catch (e) {
    return null;
  }

  return (
    <div className="home-grid">
      <div className="title-container">
        <h1>Easy Node</h1>
      </div>
      <EasyNodeUI services={services} />
    </div>
  );
}
