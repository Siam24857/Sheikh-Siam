import { useSyncExternalStore } from "react";

/** True after client hydration; false on the server. Avoids setState-in-effect. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
