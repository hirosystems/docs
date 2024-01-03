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
    value: 'Subnets',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'subnets/index',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'subnets/getting-started',
  },
  {
    type: 'html',
    value: 'Features',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Event dispatching / observer interface',
    id: 'subnets/event-dispatcher',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Subnet Architecture',
    id: 'subnets/guides/subnet-participants',
  },
  {
    type: 'doc',
    label: 'Trust models',
    id: 'subnets/guides/trust-models',
  },
];
