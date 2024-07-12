"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { npmPackageExists } from "../../service/npmPackageFinderService";
import { tsTypesPrefix } from "../../constants/npmFInder";

import { debounce } from "../../lib/util";

type PackageSearchProps = {
  setDependencies: Dispatch<SetStateAction<Set<string>>>;
  setDevDependencies: Dispatch<SetStateAction<Set<string>>>;
};

export default function PackageSearch(props: PackageSearchProps) {
  const { setDependencies, setDevDependencies } = props;

  // const { Modal } = useModal({});

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

  const setProdResult = (packageName: string) => {
    setResults((prev) => {
      const updatedArray = [...prev];
      updatedArray[0] = packageName;
      return updatedArray;
    });
  };

  const setDevResult = (packageName: string) => {
    setResults((prev) => {
      const updatedArray = [...prev];
      updatedArray[1] = packageName;
      return updatedArray;
    });
  };

  const debouncedNpmSearch = useMemo(() => {
    const searchForNpmLibrary = async (
      searchString: string,
      includeTsTypes = false
    ) => {
      const exists = await npmPackageExists(searchString);

      if (!exists) {
        return;
      }

      if (searchMode === "dev") {
        setDevResult(searchString);
        resetSearch();
        return;
      }
      setProdResult(searchString);
      if (includeTsTypes) {
        const typesSearch = tsTypesPrefix + searchString;
        const typesExists = await npmPackageExists(typesSearch);
        if (!typesExists) {
          setDevResult("");
          return;
        }
        setDevResult(typesSearch);
      } else {
        setDevResult("");
      }
    };

    return debounce(searchForNpmLibrary, 1000);
  }, [searchMode]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedNpmSearch(value, toggleTs);
  };

  const handleToggleTsClick = () => {
    const next = !toggleTs;
    setToggleTs(next);
    if (searchMode === "prod") {
      debouncedNpmSearch(search, next);
    }
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
    setSearch("");
    resetResults();
  };

  const toggleText = toggleTs ? "Include @types" : "Omit @types";
  const toggleStyles = toggleTs ? "pf-toggle-on" : "pf-toggle-off";
  const resultsFound = results.find((res) => res != "");

  return (
    <div className="pf-search">
      <div className="pf-search-container">
        <div className="search-controls">
          Package Type:
          <button
            onClick={() =>
              setSearchMode(searchMode === "prod" ? "dev" : "prod")
            }
          >
            {searchMode === "prod" ? "Production" : "Development"}
          </button>
          <button
            className={toggleStyles}
            onClick={handleToggleTsClick}
            disabled={searchMode === "dev"}
          >
            {toggleText}
          </button>
          <input
            type="text"
            placeholder="Search for a package"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={handleAddPacakagesClick}>Confirm</button>
        </div>
        <div
          className={`results-container${resultsFound ? "-found" : "-none"}`}
        >
          Results:
          {resultsFound ? (
            <span>
              Found package(s){" "}
              {results.filter((res) => res != "").join(" and ")}
            </span>
          ) : (
            <span> No Results Found</span>
          )}
        </div>
      </div>
    </div>
  );
}
