import { type ForwardedRef, useEffect, useRef } from "react";

/**
 * Taken over from https://github.com/facebook/react/issues/24722
 *
 * Probably not the best name:
 *
 *
 * @param ref
 * @param initialValue
 */
export const useForwardRef = <T>(ref: ForwardedRef<T>, initialValue: any = null) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};
