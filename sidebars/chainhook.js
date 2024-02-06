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
    value: 'Chainhook',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'chainhook/index',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'chainhook/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Run Chainhook as a service using Bitcoind',
    id: 'chainhook/guides/chainhook-as-a-service-bitcoind',
  },
  {
    type: 'doc',
    label: 'Run Chainhook as a service using Stacks',
    id: 'chainhook/guides/chainhook-as-a-service-stacks',
  },
  {
    type: 'doc',
    label: 'Register Chainhooks on Devnet',
    id: 'chainhook/guides/register-chainhooks-on-devnet',
  },
  {
    type: 'doc',
    label: 'Use Chainhook with Bitcoin',
    id: 'chainhook/guides/chainhooks-with-bitcoin',
  },
  {
    type: 'doc',
    label: 'Use Chainhook with Stacks',
    id: 'chainhook/guides/chainhooks-with-stacks',
  },
  {
    type: 'html',
    value: 'Other',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'FAQs',
    id: 'chainhook/faq',
  },
];
