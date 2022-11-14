import { useCallback, useState } from "react";

type UseFlagAPI = { clear(): void; set(): void };

export default function useFlag(initialValue = false): [boolean, UseFlagAPI] {
  const [value, setValue] = useState(initialValue);

  const clear = useCallback(() => setValue(false), []);
  const set = useCallback(() => setValue(true), []);

  return [value, { clear, set }];
}
