import {
  GITHUB_REPOSITORY_URL,
  PULL_REQUEST_PATH,
} from '../../config/index.js';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: GITHUB_REPOSITORY_URL },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(({ url }) => {
  if (url.includes(PULL_REQUEST_PATH)) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {}, res => {});
    });
  }
});

// TODO: Handle send message errors.
