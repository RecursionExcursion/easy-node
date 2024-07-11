"use client";

import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { createNodePackageCliCommand } from "../lib/cliCommandGenerator";
import { ScriptRequest } from "../types/scriptRequest";
import { postCliCommand } from "../service/cliCommandService";
import { postScript } from "../service/scriptService";
import downloadToBrowser from "../lib/downloadToBrowser";

type ExportControlsProps = {
  dependencies: Set<string>;
  devDependencies: Set<string>;
};

export default function ExportControls(props: ExportControlsProps) {
  const { dependencies, devDependencies } = props;

  const [commands, setCommands] = useState<string[]>([]);

  const handleShowCliExportClick = async () => {
    if (!dependencies.size && !devDependencies.size) {
      setCommands([]);
      return;
    }

    const request: ScriptRequest = {};

    if (dependencies.size) {
      request.prodDependencies = Array.from(dependencies);
    }

    if (devDependencies.size) {
      request.devDependencies = Array.from(devDependencies);
    }

    const commands = await postCliCommand(request);


    if (!commands || commands === null) {
      //TODO Show feedback to user
      setCommands([]);
      return;
    }

    setCommands(commands);
  };

  const handleExportToScriptClick = async () => {
    if (!dependencies.size && !devDependencies.size) {
      setCommands([]);
      return;
    }

    const request: ScriptRequest = {};

    if (dependencies.size) {
      request.prodDependencies = Array.from(dependencies);
    }

    if (devDependencies.size) {
      request.devDependencies = Array.from(devDependencies);
    }

    const { script, fileName } = await postScript(request);

    downloadToBrowser(script, fileName);
  };

  const handleCopyCliCommand = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  return (
    <div className="export-controls-container">
      <div className="button-container">
        <button onClick={handleExportToScriptClick} className="controls-button">
          Export to script
        </button>
        <button className="controls-button" onClick={handleShowCliExportClick}>
          Imports CLI
        </button>
      </div>
      {commands.length > 0 && (
        <div className="commands-parent">
          {commands.map((command, index) => (
            <div key={command + index} className="command-container">
              <button onClick={() => handleCopyCliCommand(command)}>
                <FaCopy />
              </button>
              <pre className="code-pre">
                <code key={index}>{command}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
