const textarea = document.querySelectorAll('.form-input__textarea textarea');

const getHeightWithoutBorder = (el) => {
  let realscrollHeight = el.scrollHeight;
  realscrollHeight = el.scrollHeight;
  let textareaContainer = el.closest('.form-input__textarea');
  let span = textareaContainer.querySelector('span');
  const placeholder = el.placeholder;
  span.textContent = placeholder;
  let spanScrollHeight = span.scrollHeight;

  if (!el.value) {
    el.value = 0;
    realscrollHeight = el.scrollHeight;
    el.value = '';
  }

  const elMinHeight = spanScrollHeight + span.offsetHeight - span.clientHeight + 2;
  const elHeight = realscrollHeight + el.offsetHeight - el.clientHeight;
  const heightArray = [elMinHeight, elHeight];

  return heightArray;
};

const resizeHeight = (el) => {
  let textareaContainer = el.closest('.form-input__textarea');
  el.style.height = 'auto';
  el.style.minHeight = `${getHeightWithoutBorder(el)[0]}px`;
  el.style.height = `${getHeightWithoutBorder(el)[1]}px`;
  textareaContainer.style.height = `${getHeightWithoutBorder(el)[1]}px`;
};

const initAutoResizeTextarea = () => {
  if (!textarea.length) {
    return;
  }

  textarea.forEach((el) => {
    el.classList.add('.is-initialized');
    el.style.overflow = 'hidden';
    el.style.resize = 'none';
    resizeHeight(el);

    el.addEventListener('input', () => {
      resizeHeight(el);
    });

    const form = el.closest('form');

    if (form) {
      form.addEventListener('submit', () => {
        resizeHeight(el);
      });
    }
  });

  window.addEventListener('resize', () => {
    textarea.forEach((el) => {
      resizeHeight(el);
    });
  });
};

export {initAutoResizeTextarea, resizeHeight};
