import { fromPromise } from "@cpro-js/react-core";
import { IPromiseBasedObservable } from "mobx-utils/lib/from-promise";
import { useEffect, useRef, useState } from "react";

import { useLatestCallback } from "./useLatestCallback";

export const usePromise = <T>(
  loader: () => Promise<T>,
  deps: Array<any> = []
): [promise: IPromiseBasedObservable<T>, refresh: () => void, setPromise: (promise: Promise<T>) => void] => {
  const mountedRef = useRef(false);
  const [, setRefreshCounter] = useState(0);
  const updatePromise = useLatestCallback(() => {
    try {
      promiseRef.current = fromPromise(loader());
    } catch (e) {
      promiseRef.current = fromPromise.reject(e);
    }
  });
  const refresh = useLatestCallback(() => {
    setRefreshCounter(counter => {
      updatePromise();
      return counter === 0 ? 1 : 0;
    });
  });
  const promiseRef = useRef<IPromiseBasedObservable<T> | null>(null);
  const setPromise = useLatestCallback((promise: Promise<T>) => {
    setRefreshCounter(counter => {
      promiseRef.current = fromPromise(promise);
      return counter === 0 ? 1 : 0;
    });
  });

  if (promiseRef.current === null) {
    // ensure initial state of promise
    updatePromise();
  }

  useEffect(() => {
    // ignore first request
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    // deps changed -> refresh
    refresh();
  }, [...deps]);

  return [promiseRef.current!, refresh, setPromise];
};
