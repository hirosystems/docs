module.exports = [
  {
    type: 'category',
    label: 'Back to home',
    type: 'link',
    href: '/',
    className: 'back-link'
  },
  {
    type: 'html',
    value: 'Clarinet',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'clarinet/overview',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'clarinet/getting-started',
  },
  {
    type: 'html',
    value: 'Clarinet JS SDK',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Introduction',
    id: 'clarinet/feature-guides/clarinet-js-sdk',
  },
  {
    type: 'doc',
    label: 'Test your contracts with Clarinet SDK',
    id: 'clarinet/feature-guides/test-contract-with-clarinet-sdk',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Analyze contracts with `check_checker`',
    id: 'clarinet/feature-guides/analyze-with-check-checker',
  },
  {
    type: 'doc',
    label: 'Deploy a contract',
    id: 'clarinet/feature-guides/clarinet-deploy',
  },
  {
    type: 'doc',
    label: 'How to run a local testing environment',
    id: 'clarinet/feature-guides/clarinet-integrate',
  },
]
