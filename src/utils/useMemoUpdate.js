import { useMemo } from "react";

export const useMemoUpdate = (value, set) => {
  useMemo(() => ({ value, set }), [value, set]);
};
