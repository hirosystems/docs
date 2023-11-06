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
    value: 'Stacks Explorer',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'explorer/overview',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'explorer/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Run a local instance of Stacks Explorer',
    id: 'explorer/guides/build-explorer',
  },
]