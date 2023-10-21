const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, component, place = 'beforeend') => {
  switch (place) {
    case 'prepend':
      container.prepend(component);
      break;
    case 'afterend':
      container.after(component);
      break;
    case 'beforeend':
      container.append(component);
      break;
  }
};

const createNativeOptionsMarkup = (items, activeIndex) => {
  return items.map((el, index) => {
    if (activeIndex.length) {
      const currentIndex = activeIndex.find((item) => item === index);
      if (currentIndex === index) {
        return `<option ${el.value ? `value=${el.value}` : ''} selected>${el.text ? `${el.text}` : ''}</option>`;
      } else {
        return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
      }
    } else {
      return `<option ${el.value ? `value=${el.value}` : ''}>${el.text ? `${el.text}` : ''}</option>`;
    }
  }).join('\n');
};

const createNativeSelectMarkup = ({id, items, multiple, name, required, activeIndex = []}) => {
  return `<select ${id ? `id='${id}'` : ''} ${name ? `name='${name}'` : ''} ${multiple ? 'multiple' : ''} ${
    required ? 'required' : ''
  } tabindex="-1" aria-hidden="true">
            <option value=""></option>
            ${createNativeOptionsMarkup(items, activeIndex)}
          </select>`;
};

const setActiveState = (multiple, selectItems) => {
  let flag = true;
  let activeIndex = [];
  selectItems.forEach((item, index) => {
    if (multiple) {
      if (item.getAttribute('aria-selected') === 'true') {
        activeIndex.push(index);
      }
    } else {
      if (item.getAttribute('aria-selected') === 'true' && flag) {
        activeIndex.push(index);
        flag = false;
      } else {
        item.setAttribute('aria-selected', 'false');
      }
    }
  });
  return activeIndex;
};

const createMultiString = (arr) => {
  let str = '';
  if (arr.length) {
    if (arr.length === 1) {
      str = arr[0].textContent;
    } else {
      arr.forEach((el, index) => {
        if (index === arr.length - 1) {
          str += el.textContent;
        } else {
          str += `${el.textContent}, `;
        }
      });
    }
  }
  return str;
};

const setSelectActiveState = (multiple, insert, item) => {
  const buttonTextBlock = item.querySelector('.custom-select__text');
  const activeItems = item.querySelectorAll('.custom-select__item[aria-selected="true"]');
  const label = item.querySelector('.custom-select__label');
  const str = createMultiString(activeItems);

  buttonTextBlock.style.transition = '0s';
  label.style.transition = '0s';

  setTimeout(() => {
    label.style.transition = null;
    buttonTextBlock.style.transition = null;
  }, 300);

  if (multiple && insert) {
    item.classList.add('not-empty');
    buttonTextBlock.innerHTML = str;
  } else if (multiple) {
    return;
  } else {
    item.classList.add('not-empty');
    buttonTextBlock.innerHTML = activeItems[0].innerHTML;
  }
};

const createSelectStructure = (item) => {
  const options = {};
  options.items = [];
  const multiple = item.dataset.multiple;
  const id = item.dataset.id;
  const name = item.dataset.name;
  const required = item.dataset.required;
  const insert = item.dataset.insert;
  const selectItems = item.querySelectorAll('.custom-select__item');
  const activeIndex = setActiveState(multiple, selectItems);

  if (activeIndex.length) {
    options.activeIndex = activeIndex;
    setSelectActiveState(multiple, insert, item);
  }

  options.name = name || false;
  options.id = id || false;
  options.required = Boolean(required);
  options.multiple = Boolean(multiple);

  selectItems.forEach((selectItem) => {
    const value = selectItem.dataset.selectValue;
    const itemInfo = {};
    itemInfo.text = selectItem.innerText;
    itemInfo.value = value;
    options.items.push(itemInfo);
  });

  renderElement(item, createElement(createNativeSelectMarkup(options)));
  return item;
};

const closeSelect = () => {
  const activeSelect = document.querySelector('[data-select].is-open');
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onEscapePress);
  if (activeSelect) {
    activeSelect.classList.remove('is-open');
  }
};

const clickAction = (el, index) => {
  const parent = el.closest('.custom-select');
  const multiple = parent.dataset.multiple;
  const insert = parent.dataset.insert;
  const buttonTextBlock = parent.querySelector('.custom-select__text');
  const itemText = el.innerText;
  const options = parent.querySelectorAll('option');
  const select = parent.querySelector('select');
  const changeEv = new CustomEvent('change');
  const inputEv = new CustomEvent('input');
  select.dispatchEvent(changeEv);
  select.dispatchEvent(inputEv);
  const form = select.closest('form');

  if (form) {
    const formChangeEv = new CustomEvent('change');
    const formInputEv = new CustomEvent('input');
    form.dispatchEvent(formChangeEv);
    form.dispatchEvent(formInputEv);
  }

  if (multiple) {
    if (insert === 'true') {
      if (el.getAttribute('aria-selected') === 'true') {
        el.setAttribute('aria-selected', 'false');
        const activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
        const str = createMultiString(activeItems);
        options[index + 1].selected = false;
        buttonTextBlock.innerText = str;
        if (!str) {
          parent.classList.remove('not-empty');
          parent.classList.remove('is-valid');
        }
      } else {
        if (parent.querySelectorAll('.custom-select__item[aria-selected="true"]').length < 3 && parent.dataset.name === 'target-industries') {
          el.setAttribute('aria-selected', 'true');
          const activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
          const str = createMultiString(activeItems);
          buttonTextBlock.innerText = str;
          parent.classList.add('not-empty');
          parent.classList.add('is-valid');
          options[index + 1].selected = true;
        } else if (!(parent.dataset.name === 'target-industries')) {
          el.setAttribute('aria-selected', 'true');
          const activeItems = parent.querySelectorAll('.custom-select__item[aria-selected="true"]');
          const str = createMultiString(activeItems);
          buttonTextBlock.innerText = str;
          parent.classList.add('not-empty');
          parent.classList.add('is-valid');
          options[index + 1].selected = true;
        }
      }
    } else {
      if (el.getAttribute('aria-selected') === 'true') {
        el.setAttribute('aria-selected', 'false');
        options[index + 1].selected = false;
      } else {
        el.setAttribute('aria-selected', 'true');
        options[index + 1].selected = true;
      }
    }
  } else {
    const activeItem = parent.querySelector('.custom-select__item[aria-selected="true"]');
    if (el.getAttribute('aria-selected') === 'true') {
      closeSelect();
    } else {
      if ((parent.dataset.name === 'company-size')) {
        if (activeItem) {
          activeItem.setAttribute('aria-selected', 'false');
          parent.classList.remove('not-empty');
          parent.classList.remove('is-valid');
        }
        const selects = document.querySelectorAll('[data-select]');
        selects.forEach((slct) => {
          if (slct.dataset.name === 'amount-to-target') {
            const slctOptions = slct.querySelectorAll('option');
            if (!(parent.classList.contains('not-empty'))) {
              const actItem = slct.querySelector('.custom-select__item[aria-selected="true"]');
              if (actItem) {
                actItem.setAttribute('aria-selected', 'false');
                slct.classList.remove('not-empty');
                slct.classList.remove('is-valid');
                const slctSpan = slct.querySelector('.custom-select__text');
                slctSpan.textContent = '';
                slctOptions.forEach((item) => {
                  item.selected = false;
                });
              }
            }
            if (slct.style.pointerEvents === 'none') {
              slct.style.pointerEvents = 'auto';
            }
            if (el.getAttribute('data-select-value') === 'small-and-medium') {
              const items = slct.querySelectorAll('li');
              const re = new RegExp(`.*\\b${el.getAttribute('data-select-value')}\\b.*`);
              items.forEach((item) => {
                if (!item.getAttribute('data-select-value').match(re)) {
                  item.style.display = 'none';
                } else {
                  item.style.display = 'list-item';
                }
              });
            } else if (el.getAttribute('data-select-value') === 'mid') {
              const items = slct.querySelectorAll('li');
              const re = new RegExp(`.*\\b${el.getAttribute('data-select-value')}\\b.*`);
              items.forEach((item) => {
                if (!item.getAttribute('data-select-value').match(re)) {
                  item.style.display = 'none';
                } else {
                  item.style.display = 'list-item';
                }
              });
            } else if (el.getAttribute('data-select-value') === 'enterprise') {
              const items = slct.querySelectorAll('li');
              const re = new RegExp(`.*\\b${el.getAttribute('data-select-value')}\\b.*`);
              items.forEach((item) => {
                if (!item.getAttribute('data-select-value').match(re)) {
                  item.style.display = 'none';
                } else {
                  item.style.display = 'list-item';
                }
              });
            }
          }
        });
        buttonTextBlock.innerText = itemText;
        el.setAttribute('aria-selected', 'true');
        parent.classList.add('not-empty');
        parent.classList.add('is-valid');
        options[index + 1].selected = true;
        closeSelect();
      } else if (!(parent.dataset.name === 'company-size')) {
        if (activeItem) {
          activeItem.setAttribute('aria-selected', 'false');
          parent.classList.remove('not-empty');
          parent.classList.remove('is-valid');
        }
        buttonTextBlock.innerText = itemText;
        el.setAttribute('aria-selected', 'true');
        parent.classList.add('not-empty');
        parent.classList.add('is-valid');
        options[index + 1].selected = true;
        closeSelect();
      }
    }
  }
};

const onDocumentClick = ({target}) => {
  if (!target.closest('.is-initialized')) {
    closeSelect();
  }
};

const onEscapePress = (e) => {
  const isEscape = e.key === 'Escape';
  if (isEscape) {
    closeSelect();
  }
};

const onItemClick = (el, index) => {
  clickAction(el, index);
};

const onItemKeydown = (e, el, index) => {
  const isEnter = e.key === 'Enter';
  if (isEnter) {
    clickAction(el, index);
  }
};

const onLastItemKeydown = (e) => {
  const isTab = e.key === 'Tab';
  if (isTab) {
    closeSelect();
  }
};

const onSelectClick = (e) => {
  const parent = e.target.closest('[data-select]');
  const activeSelect = document.querySelector('[data-select].is-open');

  parent.classList.remove('is-invalid');

  if (activeSelect && activeSelect === parent) {
    activeSelect.classList.remove('is-open');
    return;
  }

  if (activeSelect) {
    closeSelect();
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscapePress);

  if (parent.classList.contains('is-open')) {
    parent.classList.remove('is-open');
  } else {
    parent.classList.add('is-open');
  }
};

const onSelectKeydown = (e) => {
  const parent = e.target.closest('[data-select]');
  parent.classList.remove('is-invalid');
  if (e.shiftKey && e.key === 'Tab' && parent.closest('.is-open')) {
    closeSelect();
  }
};

const setSelectAction = (item) => {
  const customSelect = item;
  const button = customSelect.querySelector('.custom-select__button');
  const selectItems = customSelect.querySelectorAll('.custom-select__item');

  button.addEventListener('click', onSelectClick);
  button.addEventListener('keydown', onSelectKeydown);

  selectItems.forEach((el, index) => {
    el.addEventListener('click', () => {
      onItemClick(el, index);
    });

    el.addEventListener('keydown', (e) => {
      onItemKeydown(e, el, index);
    });

    if (index === selectItems.length - 1) {
      el.addEventListener('keydown', onLastItemKeydown);
    }
  });
};

class CustomSelect {
  constructor() {
    window.selectInit = this.init.bind(this);
  }

  setAction(item) {
    setSelectAction(item);
  }

  createSelect(item) {
    createSelectStructure(item);
    return item;
  }

  initSelects() {
    const selects = document.querySelectorAll('[data-select]');
    if (selects.length) {
      selects.forEach((select) => {
        if (!select.classList.contains('is-initialized')) {
          if (select.dataset.name === 'amount-to-target') {
            select.style.pointerEvents = 'none';
          }
          const newSelect = this.createSelect(select);
          this.setAction(newSelect);
          select.classList.add('is-initialized');
        }
      });
    }
  }

  init() {
    this.initSelects();
  }
}

const select = new CustomSelect();

export default select.init();
