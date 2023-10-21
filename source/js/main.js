import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/modals/init-modals';
import {initSlider} from './modules/init-slider';
import {initMoveTo} from './modules/init-move-to';
import {mobileMenu} from './modules/mobile-menu';
import {initHeader} from './modules/init-header';
import {initTabs} from './modules/init-tabs';
import './modules/custom-select';
import {setUploadFile} from './modules/upload-file';
import {sortTable} from './modules/table';
import {initAutoResizeTextarea} from './modules/auto-resize-textarea';
import {customizeInput} from './modules/inputs';
import {initSelect} from './modules/init-select';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();
  initHeader();
  initSlider();
  initMoveTo();
  mobileMenu();
  initTabs();
  setUploadFile();
  sortTable();
  initAutoResizeTextarea();
  customizeInput();
  initSelect();

  window.addEventListener('load', () => {
    initModals();
  });
});
