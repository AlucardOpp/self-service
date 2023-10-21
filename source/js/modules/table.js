const List = require('list.js');

const sortTable = () => {
  const table = document.querySelector('.table');
  if (table) {
    const buttons = table.querySelectorAll('button');
    const toggleButton = (evt) => {
      const button = evt.target.closest('.table__button');
      if (button) {
        const buttonText = button.textContent;
        if (!button.classList.contains('table__button--up')) {
          buttons.forEach((item) => {
            item.classList.remove('table__button--up');
            item.classList.add('table__button--down');
          });
          button.setAttribute('aria-label', `Sort by decrease ${buttonText}`);
          button.classList.add('table__button--up');
          button.classList.remove('table__button--down');
        } else {
          button.setAttribute('aria-label', `Sort by increase ${buttonText}`);
          button.classList.remove('table__button--up');
          button.classList.add('table__button--down');
        }
      }
    };
    document.addEventListener('click', toggleButton);
    const options = {
      valueNames: [
        {attr: 'data-date-start', name: 'table__start'},
        {attr: 'data-date-due', name: 'table__due'},
        {attr: 'data-status', name: 'status'}
      ],
      sortClass: 'table__button',
      listClass: 'table__list',
    };
    const tableList = new List('table', options);
    const done = () => {
      return tableList;
    };
    done();
  }
};
export {sortTable};
