"use client";

import PackageSearch from "./PackageSearch";
import { useState } from "react";
import ImportPreview from "./ImportPreview";
import ExportControls from "./ExportControls";

export default function PackageFinder() {
  const [dependencies, setDependencies] = useState<Set<string>>(new Set());
  const [devDependencies, setDevDependencies] = useState<Set<string>>(
    new Set()
  );

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

      <div className="pf-controls-cell">
        <ExportControls
          dependencies={dependencies}
          devDependencies={devDependencies}
        />
      </div>
    </div>
  );
}
