"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { npmPackageExists } from "../../service/npmPackageFinderService";
import { tsTypesPrefix } from "../../constants/npmFInder";
import useModal from "../../hooks/useModal";

type PackageSearchProps = {
  setDependencies: Dispatch<SetStateAction<Set<string>>>;
  setDevDependencies: Dispatch<SetStateAction<Set<string>>>;
};

export default function PackageSearch(props: PackageSearchProps) {
  const { setDependencies, setDevDependencies } = props;

  const { Modal } = useModal({});

  const [search, setSearch] = useState("");
  const [toggleTs, setToggleTs] = useState(false);
  const [results, setResults] = useState(new Array(2).fill(""));
  const [searchMode, setSearchMode] = useState<"prod" | "dev">("prod");

  const resetSearch = () => {
    setSearch("");
  };

  const resetResults = () => {
    setResults(new Array(2).fill(""));
  };

  const setProdDependency = (packageName: string) => {
    setResults((prev) => {
      const updatedArray = [...prev];
      updatedArray[0] = packageName;
      return updatedArray;
    });
  };

  const setDevDependency = (packageName: string) => {
    setResults((prev) => {
      const updatedArray = [...prev];
      updatedArray[1] = packageName;
      return updatedArray;
    });
  };

  const handleSearch = async () => {
    const exists = await npmPackageExists(search);

    if (!exists) {
      alert(`Package \"${search}\" not found`);
      return;
    }

    if (searchMode === "dev") {
      setDevDependency(search);
      resetSearch();
      return;
    }

    setProdDependency(search);

    if (toggleTs) {
      const typesSearch = tsTypesPrefix + search;

      const typesExists = await npmPackageExists(typesSearch);

      if (!typesExists) {
        alert(`Package \"${typesSearch}\" not found`);
        return;
      }

      setDevDependency(typesSearch);
    }

    resetSearch();
  };

  const handleAddPacakagesClick = () => {
    if (results[0] !== "") {
      setDependencies((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(results[0]);
        return updatedSet;
      });
    }

    if (results[1] !== "") {
      setDevDependencies((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(results[1]);
        return updatedSet;
      });
    }

    resetResults();
  };

  const toggleText = toggleTs ? "Include @types" : "Omit @types";
  const toggleStyles = toggleTs ? "pf-toggle-on" : "pf-toggle-off";

  return (
    <div className="pf-search">
      <div className="pf-search-container">
        Package Type:
        <button
          onClick={() => setSearchMode(searchMode === "prod" ? "dev" : "prod")}
        >
          {searchMode === "prod" ? "Production" : "Development"}
        </button>
        <button
          className={toggleStyles}
          onClick={() => setToggleTs(!toggleTs)}
          disabled={searchMode === "dev"}
        >
          {toggleText}
        </button>
        <input
          type="text"
          placeholder="Search for a package"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {results.find((res) => res != "") && (
        <Modal>
          <div className="results-container">
            <span>
              Found packages {results.filter((res) => res != "").join(" and ")}
            </span>
            <button onClick={handleAddPacakagesClick}>Add</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
