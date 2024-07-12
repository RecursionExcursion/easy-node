"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Service } from "../types/apiResponse";

type FrameWorkInterfaceProps = {
  setFramework: Dispatch<SetStateAction<string | undefined>>;
  setRuntime: Dispatch<SetStateAction<string | undefined>>;
  services: Service[];
};

export default function FrameworkInterface(props: FrameWorkInterfaceProps) {
  const { services, setFramework, setRuntime } = props;

  const [currentService, setCurrentService] = useState(services[0]);

  const [enabled, setEnabled] = useState(false);

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const nextService = getServiceByName(value, services);
    if (!nextService) return;

    setCurrentService(nextService);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFramework(value);
    setRuntime(currentService?.runtime);
  };

  const handleShowUIClick = () => {
    const next = !enabled;
    setEnabled(next);
    if (!next) {
      setFramework(undefined);
      setRuntime(undefined);
    }
  };

  return (
    <div className="framework">
      <div>
        <h2>Runtimes and Frameworks</h2>
        <input type="checkbox" checked={enabled} onChange={handleShowUIClick} />
      </div>
      {enabled && (
        <>
          <select value={currentService.runtime} onChange={handleSelection}>
            {services.map((ser, i) => {
              return (
                <option key={ser.runtime + i} value={ser.runtime}>
                  {ser.runtime}
                </option>
              );
            })}
          </select>
          {currentService &&
            currentService.libraries.map((lib, i) => {
              return (
                <div key={lib + i}>
                  <input
                    type="radio"
                    name="lib"
                    value={lib}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={lib}>{lib}</label>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

const getServiceByName = (name: string, collection: Service[]) => {
  const index = collection.findIndex((ser) => ser.runtime === name);
  if (index < 0) return null;
  return collection[index];
};
