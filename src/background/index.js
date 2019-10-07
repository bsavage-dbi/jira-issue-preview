const exec = config => {
  const { GITHUB_REPOSITORY_URL } = config;

  return chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: `${GITHUB_REPOSITORY_URL}/pull/` },
            }),
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()],
        },
      ]);
    });
  });
};

const configUrl = chrome.runtime.getURL('config/index.js');
const config = import(configUrl).then(exec);
