"use server";

import endpoints from "../constants/endpoints";

export const npmPackageExists = async (
  packageName: string
): Promise<boolean> => {
  const res = await fetchNpmPackage(packageName);
  return res !== null;
};

const fetchNpmPackage = async (packageName: string) => {
  const res = await fetch(endpoints.npmRegistry + packageName);

  if (res.ok) {
    return await res.json();
  }

  return null;
};
