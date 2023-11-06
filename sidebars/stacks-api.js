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
    value: 'Stacks API',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks-blockchain-api/overview',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'stacks-blockchain-api/getting-started',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Run a local instance of Stacks Blockchain API',
    id: 'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
  },
]