module.exports = [
  {
    type: 'category',
    label: 'Home',
    type: 'link',
    href: '/',
    className: 'back-link'
  },
  {
    type: 'html',
    value: 'Ordhook',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'ordhook/overview',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'ordhook/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'How to run Ordhook as a service',
    id: 'ordhook/guides/ordhook-as-a-service-bitcoind',
  },
  {
    type: 'doc',
    label: 'How to scan for Ordinal activity',
    id: 'ordhook/guides/scan-ordinal-activities',
  },
  {
    type: 'doc',
    label: 'How to stream for Ordinal activity',
    id: 'ordhook/guides/stream-ordinal-activities',
  },
]