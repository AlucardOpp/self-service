const sliderContainer = document.querySelector('[data-slider]');

const initClientsSlider = (container) => new window.Swiper(container, {
  slidesPerView: 'auto',
  spaceBetween: 60,
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

export const initSlider = () => sliderContainer && initClientsSlider(sliderContainer);
