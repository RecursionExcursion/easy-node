import EasyNodeUI from "../../components/EasyNodeUI";
import { getScriptGenInfo } from "../../service/scriptService";
import { Service } from "../../types/apiResponse";
import { logToServer } from "../../lib/serverUtil";

export default async function Home() {
  let services;
  const res = await fetch("http://localhost:3000/api/cookie", {
    method: "POST",
  });
  if (res.ok) {
    services = (await res.json());
  }

  try {
  } catch (e) {
    logToServer(e as string, "error");
  }

  //TODO: clean up
  services = services.services as Service[];
  

  return (
    <div className="home-grid">
      <div className="title-container">
        <h1>Easy Node</h1>
      </div>
      {services && <EasyNodeUI services={services} />}
    </div>
  );
}
