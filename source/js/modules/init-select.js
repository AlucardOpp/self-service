const Choices = require('choices.js');

const initSelect = () => {
  const icpInfo = document.querySelector('.icp-info');
  if (icpInfo) {
    const selects = icpInfo.querySelectorAll('select');
    selects.forEach((select) => {
      if (select.getAttribute('data-type') === 'choices') {
        const placeholder = select.getAttribute('data-placeholder');
        if (select.getAttribute('data-max-count')) {
          const maxCount = select.getAttribute('data-max-count');
          let choices = new Choices(select, {
            classNames: {
              containerOuter: 'custom-select__select',
              containerInner: 'custom-select__inner',
              input: 'custom-select__input',
              inputCloned: 'custom-select__input--cloned',
              list: 'custom-select__options',
              listItems: 'custom-select__options--multiple',
              listSingle: 'custom-select__options--single',
              listDropdown: 'custom-select__options--dropdown',
              item: 'custom-select__option',
              itemSelectable: 'custom-select__option--selectable',
              itemDisabled: 'custom-select__option--disabled',
              itemChoice: 'custom-select__option--choice',
              placeholder: 'custom-select__placeholder',
              group: 'custom-select__group',
              groupHeading: 'custom-select__heading',
              button: 'custom-select__button',
              activeState: 'is-active',
              focusState: 'is-focused',
              openState: 'is-open',
              disabledState: 'is-disabled',
              highlightedState: 'is-highlighted',
              selectedState: 'is-selected',
              flippedState: 'is-flipped',
              loadingState: 'is-loading',
              noResults: 'has-no-results',
              noChoices: 'has-no-choices',
            },
            allowHTML: true,
            placeholderValue: placeholder,
            maxItemCount: maxCount,
          });
          const standartChoices = () => {
            return choices;
          };
          standartChoices();
        } else {
          let choices = new Choices(select, {
            classNames: {
              containerOuter: 'custom-select__select',
              containerInner: 'custom-select__inner',
              input: 'custom-select__input',
              inputCloned: 'custom-select__input--cloned',
              list: 'custom-select__options',
              listItems: 'custom-select__options--multiple',
              listSingle: 'custom-select__options--single',
              listDropdown: 'custom-select__options--dropdown',
              item: 'custom-select__option',
              itemSelectable: 'custom-select__option--selectable',
              itemDisabled: 'custom-select__option--disabled',
              itemChoice: 'custom-select__option--choice',
              placeholder: 'custom-select__placeholder',
              group: 'custom-select__group',
              groupHeading: 'custom-select__heading',
              button: 'custom-select__button',
              activeState: 'is-active',
              focusState: 'is-focused',
              openState: 'is-open',
              disabledState: 'is-disabled',
              highlightedState: 'is-highlighted',
              selectedState: 'is-selected',
              flippedState: 'is-flipped',
              loadingState: 'is-loading',
              noResults: 'has-no-results',
              noChoices: 'has-no-choices',
            },
            allowHTML: true,
            placeholderValue: placeholder,
          });
          const standartChoices = () => {
            return choices;
          };
          standartChoices();
        }
      }
    });
  }
};

export {initSelect};
