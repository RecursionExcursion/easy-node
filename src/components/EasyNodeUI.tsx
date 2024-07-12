"use client";

import PackageFinder from "./PackageFinder/PacakageFinder";
import { useState } from "react";
import ExportControls from "./ExportUI";
import { Service } from "../types/apiResponse";
import FrameworkInterface from "./FrameworkSelector";

type EasyNodeUIProps = {
  services: Service[];
};

export default function EasyNodeUI(props: EasyNodeUIProps) {
  const { services } = props;
  const [dependencies, setDependencies] = useState<Set<string>>(new Set());
  const [devDependencies, setDevDependencies] = useState<Set<string>>(
    new Set()
  );
  const [framework, setFramework] = useState<string>();
  const [runtime, setRuntime] = useState<string>();

  return (
    <div className="content-grid">
      <PackageFinder
        dependencies={dependencies}
        setDependencies={setDependencies}
        devDependencies={devDependencies}
        setDevDependencies={setDevDependencies}
      />
      <ExportControls
        framework={framework}
        runtime={runtime}
        dependencies={dependencies}
        devDependencies={devDependencies}
      />
      <FrameworkInterface
        setFramework={setFramework}
        setRuntime={setRuntime}
        services={services}
      />
    </div>
  );
}
