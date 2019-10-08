export const GITHUB_REPOSITORY_URL =
  'https://github.com/<username>/<repositoryName>'; // -- required

export const JIRA = {
  ORGANIZATION_NAME: 'myOrganization', // derived from https://<myOrganization>.atlassian.net' -- required
  TICKET_ID_REGEX: /TICKET-([10-9]+)/i, // 'regular expression to match ticket id -- required
  ACTION: 'browse',
};

export const GITHUB_COMMIT_REF_CLASSNAMES = {
  SPAN: 'commit-ref',
  LINK: 'no-underline',
  COMMIT_HEAD: 'head-ref',
  COMMIT_META: 'TableObject-item--primary',
};

export const PLUGIN_SCOPE = 'JIRA-TICKET';
