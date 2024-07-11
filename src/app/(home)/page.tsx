import FetchTest from "../../components/FetchTest";
import PackageFinder from "../../components/PackageFinder/PacakageFinder";
import { getScriptGenInfo } from "../../service/scriptService";

export default async function Home() {
  // try {
  //   const scriptInfo = await getScriptGenInfo();
  //   // console.log({ scriptInfo });
  // } catch (e) {}

  return (
    <div className="home-grid">
      <div className="title-container">
        <h1>Easy Node</h1>
      </div>

      <div className="package-finder-container">
        <PackageFinder />
      </div>
    </div>
  );
}
