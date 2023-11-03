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
    value: 'Chainhook',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'chainhook/overview',
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
    label: 'How to run Chainhook as a service using Bitcoind',
    id: 'chainhook/guides/chainhook-as-a-service-bitcoind',
  },
  {
    type: 'doc',
    label: 'How to run Chainhook as a service using Stacks',
    id: 'chainhook/guides/chainhook-as-a-service-stacks',
  },
  {
    type: 'doc',
    label: 'How to use Chainhook with Bitcoin',
    id: 'chainhook/guides/chainhooks-with-bitcoin',
  },
  {
    type: 'doc',
    label: 'How to use Chainhook with Stacks',
    id: 'chainhook/guides/chainhooks-with-stacks',
  },
]