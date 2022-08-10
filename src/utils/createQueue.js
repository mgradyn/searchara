export const createQueue = () => {
  let isRunning = false;
  let pending = [];

  const next = () => {
    isRunning = true;
    const cb = pending.shift();
    if (cb) {
      return cb(next);
    }
    isRunning = false;
  };

  const clear = () => {
    isRunning = false;
    pending = [];
  };

  const enqueue = (cb) => {
    pending.push(cb);
    if (!isRunning && pending.length === 1) {
      next();
    }
  };

  return {
    clear: clear,
    enqueue: enqueue,
  };
};
