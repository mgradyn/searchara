import { useCallback, useEffect, useRef } from "react";

import { clamp } from "./clamp";
import { createQueue } from "./createQueue";
import { createTimeout } from "./createTimeout";
import { increment } from "./increment";
import { useEffectOnce } from "./useEffectOnce";
import { useGetSetState } from "./useGetSetState";
import { useUpdateEffect } from "./useUpdateEffect";

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

/* istanbul ignore next */
const noop = () => undefined;

const initialState = {
  isFinished: true,
  progress: 0,
  sideEffect: noop,
};

export const useNProgress = (_a) => {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.animationDuration,
    animationDuration = _c === void 0 ? 200 : _c,
    _d = _b.incrementDuration,
    incrementDuration = _d === void 0 ? 800 : _d,
    _e = _b.isAnimating,
    isAnimating = _e === void 0 ? false : _e,
    _f = _b.minimum,
    minimum = _f === void 0 ? 0.08 : _f;

  const [get, setState] = useGetSetState(initialState);

  const queue = useRef(null);
  const timeout = useRef(null);

  useEffectOnce(() => {
    queue.current = createQueue();
    timeout.current = createTimeout();
  });

  const cleanup = useCallback(() => {
    timeout.current?.cancel();
    queue.current?.clear();
  }, []);

  const set = useCallback(
    (n) => {
      n = clamp(n, minimum, 1);

      if (n === 1) {
        cleanup();

        queue.current?.enqueue((next) => {
          setState({
            progress: n,
            sideEffect: () =>
              timeout.current?.schedule(next, animationDuration),
          });
        });

        queue.current?.enqueue(() => {
          setState({ isFinished: true, sideEffect: cleanup });
        });

        return;
      }

      queue.current?.enqueue((next) => {
        setState({
          isFinished: false,
          progress: n,
          sideEffect: () => timeout.current?.schedule(next, animationDuration),
        });
      });
    },
    [animationDuration, cleanup, minimum, queue, setState, timeout]
  );

  const trickle = useCallback(() => {
    set(increment(get().progress));
  }, [get, set]);

  const start = useCallback(() => {
    const work = () => {
      trickle();
      queue.current?.enqueue((next) => {
        timeout.current?.schedule(() => {
          work();
          next();
        }, incrementDuration);
      });
    };

    work();
  }, [incrementDuration, queue, timeout, trickle]);

  const savedTrickle = useRef(noop);

  const sideEffect = get().sideEffect;

  useEffect(() => {
    savedTrickle.current = trickle;
  });

  useEffectOnce(() => {
    if (isAnimating) {
      start();
    }
    return cleanup;
  });

  useUpdateEffect(() => {
    get().sideEffect();
  }, [get, sideEffect]);

  useUpdateEffect(() => {
    if (!isAnimating) {
      set(1);
    } else {
      setState({
        ...initialState,
        sideEffect: start,
      });
    }
  }, [isAnimating, set, setState, start]);

  return {
    animationDuration,
    isFinished: get().isFinished,
    progress: get().progress,
  };
};
