const BREAKPOINT_TABLET = window.matchMedia('(max-width: 719px)');
const body = document.body;
const header = body.querySelector('.header');
const burger = header && header.querySelector('.header__burger');

if (header) {
  header.classList.remove('header--nojs');
}

const openMenu = () => {
  header.classList.add('header--opened');
  body.style.position = 'fixed';
};

const closeMenu = () => {
  header.classList.remove('header--opened');
  body.style.position = 'relative';
};

const onPopupEscPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    header.classList.remove('header--opened');
    body.style.position = 'relative';
  }
};

const deleteOpened = () => {
  if (!BREAKPOINT_TABLET.matches) {
    closeMenu();
  }
};


export const mobileMenu = () => {
  if (!burger) {
    return;
  }
  burger.addEventListener('click', () => {
    if (header.classList.contains('header--opened')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  BREAKPOINT_TABLET.addListener(deleteOpened);
  document.addEventListener('keydown', onPopupEscPress);
};
