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
    value: 'Ordinals Explorer',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'ordinals-explorer/overview',
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
    label: 'How to run an Ordinals Explorer locally',
    id: 'ordinals-explorer/guides/build-explorer',
  },
]