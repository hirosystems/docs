import React from "react";

export function useLocalStorage(
  key: string | undefined,
  initialState: string
): [string, (v: string) => void] {
  if (!key) {
    return React.useState(initialState);
  }

  const [state, setState] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        return storedValue;
      }
    }
    return initialState;
  });

  const setStorage = (value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
      window.dispatchEvent(new StorageEvent("storage", { key }));
    }
    setState(value);
  };

  React.useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        const storedValue = window.localStorage.getItem(key);
        setState(storedValue || initialState);
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [key]);

  return [state, setStorage];
}
