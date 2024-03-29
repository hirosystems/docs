module.exports = [
  {
    type: 'category',
    label: 'Home',
    type: 'link',
    href: '/',
    className: 'back-link',
  },
  {
    type: 'html',
    value: 'Hiro Archive',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'hiro-archive/index',
  },
  {
    type: 'html',
    value: 'Supported Services',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Stacks Blockchain',
    id: 'hiro-archive/guides/use-stacks-blockchain-archive',
  },
  {
    type: 'doc',
    label: 'Stacks Blockchain API',
    id: 'hiro-archive/guides/use-stacks-blockchain-api-archive',
  },
  {
    type: 'doc',
    label: 'Token Metadata API',
    id: 'hiro-archive/guides/use-token-metadata-api-archive',
  },
  {
    type: 'doc',
    label: 'Verify archive data',
    id: 'hiro-archive/guides/verify-archive-data',
  },
];
