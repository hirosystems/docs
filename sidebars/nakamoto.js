module.exports = [
  {
    type: 'category',
    label: 'Back',
    type: 'link',
    href: '/',
    className: 'back-link',
  },
  {
    type: 'html',
    value: 'Nakamoto',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'nakamoto/index',
  },
  {
    type: 'category',
    label: 'API Reference',
    type: 'link',
    href: '/nakamoto-api',
  },
  {
    type: 'html',
    value: 'By Product',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Clarinet',
    id: 'nakamoto/clarinet',
  },
  {
    type: 'doc',
    label: 'Explorer',
    id: 'nakamoto/explorer',
  },
  {
    type: 'doc',
    label: 'Stacks.js',
    id: 'nakamoto/stacks-js',
  },
  {
    type: 'doc',
    label: 'Stacks API',
    id: 'nakamoto/stacks-api',
  },
];
