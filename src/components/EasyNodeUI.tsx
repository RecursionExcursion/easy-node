"use client";

import { useState } from "react";
import PackageFinder from "./PackageFinder/PacakageFinder";
import ExportControls from "./ExportUI";

type EasyNodeUIProps = {
  services: unknown;
};

export default function EasyNodeUI(props: EasyNodeUIProps) {
  const [dependencies, setDependencies] = useState<Set<string>>(new Set());
  const [devDependencies, setDevDependencies] = useState<Set<string>>(
    new Set()
  );

  return (
    <div className="content-grid">
      <PackageFinder
        dependencies={dependencies}
        setDependencies={setDependencies}
        devDependencies={devDependencies}
        setDevDependencies={setDevDependencies}
      />
      <ExportControls
        dependencies={dependencies}
        devDependencies={devDependencies}
      />
    </div>
  );
}
