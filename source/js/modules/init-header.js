export const initHeader = () => {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }
  const onResizeBlock = (entities) => entities.forEach(({target}) => {
    document.documentElement.style.setProperty('--header-height', `${target.offsetHeight}px`);
  });
  const resizeObserver = new ResizeObserver(onResizeBlock);
  resizeObserver.observe(header);
};
