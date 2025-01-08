import { useRef } from "react";

/**
 * A custom hook that stores the last value in ref
 * @param value
 */
export const useLatestRef = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};
