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
    value: 'Ordhook',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'ordhook/index',
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
    label: 'Run Ordhook as a service',
    id: 'ordhook/guides/ordhook-as-a-service-bitcoind',
  },
  {
    type: 'doc',
    label: 'Scan for Ordinal activity',
    id: 'ordhook/guides/scan-ordinal-activities',
  },
  {
    type: 'doc',
    label: 'Stream for Ordinal activity',
    id: 'ordhook/guides/stream-ordinal-activities',
  },
];
