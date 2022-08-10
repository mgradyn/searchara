export const preventDefault = () => {
  const preventDefaultAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    preventDefaultAction: preventDefaultAction,
  };
};
