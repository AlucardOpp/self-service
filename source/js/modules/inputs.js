const customizeInput = () => {
  const emailTemplates = document.querySelector('.email-templates');
  if (emailTemplates) {
    const inputs = emailTemplates.querySelectorAll('input');
    const textareas = emailTemplates.querySelectorAll('textarea');
    const onInputBlur = (evt) => {
      const input = evt.target;
      const inputName = input.getAttribute('name');
      const inputText = input.value;
      if (input.tagName === 'INPUT') {
        inputs.forEach((item) => {
          const name = item.getAttribute('name');
          if (name === inputName) {
            item.value = inputText;
          }
        });
      } else if (input.tagName === 'TEXTAREA') {
        textareas.forEach((item) => {
          const name = item.getAttribute('name');
          if (name === inputName) {
            item.value = inputText;
          }
        });
      }
    };
    inputs.forEach((item) => {
      item.addEventListener('focusout', onInputBlur);
    });
    textareas.forEach((item) => {
      item.addEventListener('focusout', onInputBlur);
    });
  }
};

export {customizeInput};
