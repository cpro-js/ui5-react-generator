import { useMemo } from "react";

import { useLatestRef } from "./useLatestRef";

/**
 * A custom hook that converts a callback into a stable function to avoid re-renders when passed as prop or as a dependency
 * Use cases:
 *  - registration of custom event listeners
 *  - change listener
 *
 * @param callback
 */
export const useLatestCallback = <T extends (...args: any[]) => any>(
  callback: T | undefined
): T => {
  const callbackRef = useLatestRef(callback);

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
};
