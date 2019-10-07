export const GITHUB_REPOSITORY_URL =
  'Github repository url e.g https://github.com/<username>/<repositoryName>'; // required

export const JIRA = {
  ORGANIZATION_NAME:
    'Your Atlassian organization name derived from https://<organizationName>.atlassian.net', // required
  TICKET_ID_REGEX:
    'regular expression to match ticket id e.g /TICKET-([10-9]+)/i', // required
  ACTION: 'browse',
};

export const GITHUB_COMMIT_REF_CLASSNAMES = {
  SPAN: 'commit-ref',
  LINK: 'no-underline',
  COMMIT_HEAD: 'head-ref',
  COMMIT_META: 'TableObject-item--primary',
};

export const PLUGIN_SCOPE = 'JIRA-TICKET';
