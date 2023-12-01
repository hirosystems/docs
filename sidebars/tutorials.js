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
    value: 'Tutorials',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'tutorials/index',
  },
  {
    type: 'category',
    label: 'Stacks basics',
    items: [
      'tutorials/managing-accounts',
      'tutorials/sending-tokens',
      'tutorials/stacking-using-cli',
    ],
  },
  {
    type: 'category',
    label: 'Developing with Clarinet',
    items: [
      'tutorials/clarity-hello-world',
      'tutorials/clarity-counter',
      'tutorials/clarity-billboard',
      'tutorials/clarity-nft',
      'tutorials/testing-contracts',
    ],
  },
];
