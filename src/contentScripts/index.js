const exec = config => {
  const {
    PLUGIN_SCOPE,
    JIRA: { ACTION, ORGANIZATION_NAME, TICKET_ID_REGEX },
    GITHUB_COMMIT_REF_CLASSNAMES,
  } = config;

  const headRef = document.getElementsByClassName(
    GITHUB_COMMIT_REF_CLASSNAMES.COMMIT_HEAD,
  )[0];
  const ghHeaderMeta = document.getElementsByClassName(
    GITHUB_COMMIT_REF_CLASSNAMES.COMMIT_META,
  )[0];

  if (headRef && ghHeaderMeta) {
    const branchName = headRef.innerText;
    const ticketIDMatch = (branchName.match(TICKET_ID_REGEX) || [])[0];

    if (ticketIDMatch) {
      const ticketID = ticketIDMatch.toUpperCase();
      const ticketURL = `https://${ORGANIZATION_NAME}.atlassian.net/${ACTION}/${ticketID}`;

      const injectedNodeContainer = document.createElement('span');
      const linkContainer = document.createElement('span');
      const jiraLink = document.createElement('a');

      jiraLink.id = `${PLUGIN_SCOPE}-${ticketID}`;
      jiraLink.title = ticketURL;
      jiraLink.href = ticketURL;
      jiraLink.classList = GITHUB_COMMIT_REF_CLASSNAMES.LINK;
      jiraLink.textContent = `${PLUGIN_SCOPE}:${ticketID}`;
      jiraLink.target = '_blank';

      linkContainer.appendChild(jiraLink);
      linkContainer.classList = GITHUB_COMMIT_REF_CLASSNAMES.SPAN;
      injectedNodeContainer.textContent = '- Resolves ';
      injectedNodeContainer.appendChild(linkContainer);
      ghHeaderMeta.appendChild(injectedNodeContainer);
    }
  }
};

const configUrl = chrome.runtime.getURL('config/index.js');
const config = import(configUrl).then(exec);
