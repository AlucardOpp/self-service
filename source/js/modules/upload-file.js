const setUploadFile = () => {
  const uploadFileContainer = document.querySelector('.upload-file');
  if (uploadFileContainer) {
    const fileInputs = document.querySelectorAll('.upload-file__input');
    fileInputs.forEach((input) => {
      const label = input.nextElementSibling;
      const button = label.nextElementSibling;

      button.addEventListener('click', () => {
        if (button.classList.contains('upload-file__upload-result--active')) {
          input.value = '';
          button.textContent = 'No files selected';
          button.classList.remove('upload-file__upload-result--active');
        }
      });

      input.addEventListener('change', (evt) => {
        button.textContent = evt.target.files[0].name;
        if (!button.classList.contains('upload-file__upload-result--active')) {
          button.classList.add('upload-file__upload-result--active');
        }
      });
    });
  }
};

export {setUploadFile};
