import { useCallback, useRef, useState } from "react";

var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };

const incrementParameter = (num) => ++num % 1_000_000;

const useUpdate = () => {
  const [, setState] = useState(0);
  return useCallback(() => setState(incrementParameter), []);
};

export const useGetSetState = (initialState) => {
  if (initialState === void 0) {
    initialState = {};
  }
  const update = useUpdate();
  const state = useRef(__assign({}, initialState));
  const get = useCallback(() => state.current, []);
  const set = useCallback((patch) => {
    if (!patch) {
      return;
    }
    Object.assign(state.current, patch);
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [get, set];
};
