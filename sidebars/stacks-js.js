// TODO: there are more docs that need to be added that dont fit into overview, getting-started, and guides
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
    value: 'Stacks.js',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks.js/index',
  },
  {
    type: 'doc',
    label: 'Installation',
    id: 'stacks.js/installing',
  },
  {
    type: 'doc',
    label: 'Learn the basics',
    id: 'stacks.js/learn-the-basics',
  },
  {
    type: 'doc',
    label: 'FAQs',
    id: 'stacks.js/faq',
  },
  {
    type: 'doc',
    label: 'Roadmap',
    id: 'stacks.js/roadmap',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Integrate Stacking',
    id: 'stacks.js/guides/how-to-integrate-stacking', // TODO: merge both stacking guides
  },
  {
    type: 'doc',
    label: 'Post-Conditions',
    id: 'stacks.js/guides/deep-dive-post-conditions',
  },
  {
    type: 'doc',
    label: 'Expo (React Native)',
    id: 'stacks.js/guides/react-native-guide',
  },
  {
    type: 'html',
    value: 'Connect',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks.js/connect',
  },
  {
    type: 'html',
    value: 'Connect Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Authenticate with Connect',
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
];
