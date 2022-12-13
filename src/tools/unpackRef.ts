import { ForwardedRef } from "react";

export default function unpackRef<T>(ref: ForwardedRef<T>) {
  if (typeof ref === "function") return undefined;
  return ref?.current ?? undefined;
}
