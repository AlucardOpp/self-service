export const initMoveTo = () => {
  const triggers = [...document.querySelectorAll('.js-scroll-trigger')];
  const moveTo = new window.MoveTo();
  triggers.forEach((it) => moveTo.registerTrigger(it));
};
