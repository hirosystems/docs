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
    value: 'Ordinals Explorer',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'ordinals-explorer/index',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'ordinals-explorer/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Run an Ordinals Explorer locally',
    id: 'ordinals-explorer/guides/build-explorer',
  },
];
