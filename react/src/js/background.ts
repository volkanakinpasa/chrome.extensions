import {
  DEPLOYMENT_VERSION,
  getRedirectAuthUrl,
  URLS,
  ENVIRONMENTS,
} from './utils/constants';
import { storageUtil } from './utils';
import { SpotifyOption } from './enums';

const { BASE_URL } = URLS;

const gaSendEvent = (data: any) => {
  // if (process.env.NODE_ENV !== ENVIRONMENTS.PRODUCTION) return;
  // const { eventCategory, eventAction, eventLabel } = data;
  // // Standard Google Universal Analytics code
  // // noinspection OverlyComplexFunctionJS
  // (function (i: any, s: any, o: any, g: any, r: any, a?: any, m?: any) {
  //   i['GoogleAnalyticsObject'] = r;
  //   const dateNow = +new Date();
  //   // noinspection CommaExpressionJS
  //   (i[r] =
  //     i[r] ||
  //     function () {
  //       // eslint-disable-next-line prefer-rest-params
  //       (i[r].q = i[r].q || []).push(arguments);
  //     }),
  //     (i[r].l = 1 * dateNow);
  //   // noinspection CommaExpressionJS
  //   (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  //   a.async = 1;
  //   a.src = g;
  //   m.parentNode.insertBefore(a, m);
  // })(
  //   window,
  //   document,
  //   'script',
  //   'https://www.google-analytics.com/analytics.js',
  //   'ga',
  // );
  // // eslint-disable-next-line no-undef
  // ga('create', 'UA-', 'auto');
  // // see: http://stackoverflow.com/a/22152353/1958200
  // // eslint-disable-next-line no-undef
  // ga('set', 'anonymizeIp', true);
  // // eslint-disable-next-line no-undef
  // ga('set', 'checkProtocolTask', function () {});
  // // eslint-disable-next-line no-undef
  // ga('send', {
  //   hitType: 'event',
  //   eventCategory,
  //   eventAction,
  //   eventLabel,
  // });
};

const onTokenCompleted = (token: any) => {
  storageUtil.setSpotifyToken(token);
};

function setBadgeText(text: any) {
  // eslint-disable-next-line no-undef
  chrome.browserAction.setBadgeText({ text });
  setTimeout(() => clearBadge(), 5000);
}

function clearBadge() {
  // eslint-disable-next-line no-undef
  chrome.browserAction.setBadgeText({ text: '' });
}

function showDialog(message: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { ...message, type: 'showDialog' },
      function (response) {},
    );
  });
}

function openTab(url: string) {
  //eslint-disable-next-line no-undef
  chrome.tabs.create({
    url,
  });
}

function openAuthRedirectUrl() {
  openTab(getRedirectAuthUrl());
}

function dialogAddAll(data: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: data, type: 'dialogAddAll' });
  });
}

const messageListener = (event: any, serder: any, callback: any) => {
  switch (event.type) {
    case 'addIconClicked':
      gaSendEvent(event.data);
      break;
    case 'clearBadge':
      clearBadge();
      callback('OK');
      break;
    case 'setBadgeText':
      setBadgeText(event.data);
      callback('OK');
      break;
    case 'onTokenCompleted':
      onTokenCompleted(event.data.token);
      break;
    case 'showDialog':
      showDialog(event);
      break;
    case 'openAuthRedirectUrl':
      openAuthRedirectUrl();
      break;
    case 'dialogAddAll':
      dialogAddAll(event.data);
      break;
  }
};
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  messageListener(message, sender, sendResponse);
});

chrome.runtime.onMessageExternal.addListener(function (
  message,
  sender,
  sendResponse,
) {
  messageListener(message, sender, sendResponse);
});

chrome.runtime.setUninstallURL(`${BASE_URL}/home/UnInstalled`);

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    //Save Auto Saved
    storageUtil.setSpotifyIconClickActionOption(SpotifyOption.AutoSave);
    storageUtil.setStorage(DEPLOYMENT_VERSION, 1);
    openTab(`chrome-extension://${chrome.runtime.id}/options.html`);
    gaSendEvent({
      pageName: 'Chrome Backgroud',
      eventCategory: 'Extension',
      eventAction: 'Extension Installed',
      eventLabel: '',
    });
  } else if (details.reason == 'update') {
    storageUtil.setStorage(DEPLOYMENT_VERSION, 1);
    gaSendEvent({
      pageName: 'Chrome Backgroud',
      eventCategory: 'Extension',
      eventAction: 'Extension Updated',
      eventLabel: '',
    });
  }
});
