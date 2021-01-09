import { useCallback, useState } from "react";
import { Failed, Loaded, Loading, UseAsyncResult } from "./UseAsyncResult";

export type { UseAsyncResult };

export function useAsync<Args extends readonly [], Res>(
  runner: (...args: Args) => Promise<Res>
): [result: UseAsyncResult<Res>, call: (...args: Args) => void] {
  const [state, setState] = useState<UseAsyncResult<Res>>(new Loading());

  const call = useCallback(
    (...args: Args) => {
      setState(new Loading());
      runner(...args).then(
        (response) => {
          setState(new Loaded(response));
        },
        (error) => {
          setState(new Failed(error));
        }
      );
    },
    [runner]
  );

  return [state, call];
}
