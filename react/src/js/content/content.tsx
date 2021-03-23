import React from 'react';
import { render } from 'react-dom';
import Form from './Form';

const injectParadifyAddContainer = () => {
  const dialogName = 'p-d-paradify-dialog-in-youtube';
  const dialog = window.document.createElement('div');
  dialog.className = dialogName;
  dialog.id = dialogName;
  window.document.body.appendChild(dialog);
  render(<Form />, window.document.getElementById(dialogName));
};

const loadInjection = () => {
  injectParadifyAddContainer();
};

const onLoad = () => {
  setTimeout(() => {
    loadInjection();
  }, 2000);
};

window.addEventListener('load', onLoad, false);
