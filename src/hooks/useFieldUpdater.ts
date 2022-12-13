import { Dispatch, SetStateAction, useCallback } from "react";

type Setter<O> = Dispatch<SetStateAction<O>>;

type FieldUpdater<O, K extends keyof O> = (value: O[K]) => void;

export default function useFieldUpdater<O, K extends keyof O>(
  set: Setter<O>,
  field: K
) {
  return useCallback<FieldUpdater<O, K>>(
    (value) => set((old) => ({ ...old, [field]: value })),
    [field, set]
  );
}
