import { useEffect, useState } from "react";

const getSearchParam = lookFor => {
  try {
    const pair = window.location.search
      .replace(/^\?/, "")
      .split("&")
      .map(part => part.split("="))
      .find(([name]) => name === lookFor) || ["", ""];
    return decodeURIComponent(pair[1]);
  } catch (e) {
    return "";
  }
};

export const useUrlState = (name, initialValue) => {
  const searchValue = getSearchParam(name);
  const [value, setValue] = useState(searchValue || initialValue);

  useEffect(
    () => {
      const search = value ? `?${name}=${encodeURIComponent(value)}` : "";
      window.history.replaceState(
        undefined,
        undefined,
        `${window.location.pathname}${search}`
      );
      return () => {};
    },
    [value]
  );

  return [value, setValue];
};