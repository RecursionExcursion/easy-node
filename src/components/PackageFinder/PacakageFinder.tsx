"use client";

import PackageSearch from "./PackageSearch";
import { Dispatch, SetStateAction } from "react";
import ImportPreview from "./ImportPreview";

type PacakageFinderProps = {
  setDependencies: Dispatch<SetStateAction<Set<string>>>;
  setDevDependencies: Dispatch<SetStateAction<Set<string>>>;
  dependencies: Set<string>;
  devDependencies: Set<string>;
};

export default function PackageFinder(props: PacakageFinderProps) {
  const { dependencies, devDependencies, setDependencies, setDevDependencies } =
    props;
  return (
    <div className="pf-grid">
      <div className="pf-search-cell">
        <PackageSearch
          setDependencies={setDependencies}
          setDevDependencies={setDevDependencies}
        />
      </div>

      <div className="pf-results-cell">
        <div className="pf-import-container">
          <ImportPreview title="Dependencies" content={dependencies} />
          <ImportPreview title="Dev Dependencies" content={devDependencies} />
        </div>
      </div>
    </div>
  );
}
