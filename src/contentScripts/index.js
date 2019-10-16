const exec = config => {
  const {
    APP,
    GITHUB_CLASSNAMES,
    JIRA: { ACTION, ORGANIZATION_NAME, TICKET_ID_REGEX },
  } = config;

  const getFirstOfType = className =>
    document.getElementsByClassName(className)[0];
  const headRef = getFirstOfType(GITHUB_CLASSNAMES.COMMIT_HEAD);
  const headerMeta = getFirstOfType(GITHUB_CLASSNAMES.COMMIT_META);
  const nodeExists = Boolean(getFirstOfType(APP.CONTAINER_CLASSNAME));

  if (nodeExists) return; // prevent creating multiple links.

  if (headRef && headerMeta) {
    const branchName = headRef.innerText;
    const ticketIDMatch = (branchName.match(TICKET_ID_REGEX) || [])[0];

    if (ticketIDMatch) {
      const ticketID = ticketIDMatch.toUpperCase();
      const ticketURL = `https://${ORGANIZATION_NAME}.atlassian.net/${ACTION}/${ticketID}`;

      const injectedNodeContainer = document.createElement('span');
      const linkContainer = document.createElement('span');
      const jiraLink = document.createElement('a');

      jiraLink.id = `${ORGANIZATION_NAME}-${APP.SCOPE}-TICKET-${ticketID}`;
      jiraLink.title = ticketURL;
      jiraLink.href = ticketURL;
      jiraLink.classList = GITHUB_CLASSNAMES.LINK;
      jiraLink.textContent = `${APP.SCOPE}-TICKET: ${ticketID}`;
      jiraLink.target = '_blank';

      linkContainer.appendChild(jiraLink);
      linkContainer.classList = GITHUB_CLASSNAMES.SPAN;
      (injectedNodeContainer.classList = APP.CONTAINER_CLASSNAME),
        (injectedNodeContainer.textContent = '- Resolves ');
      injectedNodeContainer.appendChild(linkContainer);
      headerMeta.appendChild(injectedNodeContainer);
    }
  }
};

const configUrl = chrome.runtime.getURL('config/index.js');
import(configUrl).then(config => {
  exec(config);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    exec(config);
    return sendResponse(Promise.resolve(true));
  });
});
