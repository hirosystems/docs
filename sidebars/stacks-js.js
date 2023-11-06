// TODO: there are more docs that need to be added that dont fit into overview, getting-started, and guides
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
    value: 'Stacks.js',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks.js/overview',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'stacks.js/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Authenticate users with Connect',
    id: 'stacks.js/guides/authenticate-users-with-connect',
  },
  {
    type: 'doc',
    label: 'Sign transactions',
    id: 'stacks.js/guides/sign-transactions',
  },
  {
    type: 'doc',
    label: 'Sign messages',
    id: 'stacks.js/guides/sign-messages',
  },
  {
    type: 'doc',
    label: 'How to integrate Stacking',
    id: 'stacks.js/guides/how-to-integrate-stacking', // TODO: merge both stacking guides
  },
]