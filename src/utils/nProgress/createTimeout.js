export const createTimeout = () => {
  let handle;

  const cancel = () => {
    if (handle) {
      window.cancelAnimationFrame(handle);
    }
  };

  const schedule = (callback, delay) => {
    let deltaTime;
    let start;
    const frame = (time) => {
      start = start || time;
      deltaTime = time - start;
      if (deltaTime > delay) {
        callback();
        return;
      }
      handle = window.requestAnimationFrame(frame);
    };
    handle = window.requestAnimationFrame(frame);
  };

  return {
    cancel: cancel,
    schedule: schedule,
  };
};
