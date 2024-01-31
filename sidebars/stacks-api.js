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
    value: 'Stacks API',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks-blockchain-api/index',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'stacks-blockchain-api/getting-started',
  },
  {
    type: 'html',
    value: 'Features',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'stacks-blockchain-api/feature-guides/use-stacks-blockchain-api',
  },
  {
    type: 'doc',
    label: 'Using Clarity values',
    id: 'stacks-blockchain-api/feature-guides/use-clarity-values',
  },
  {
    type: 'doc',
    label: 'Microblocks',
    id: 'stacks-blockchain-api/feature-guides/microblocks',
  },
  {
    type: 'doc',
    label: 'Transactions',
    id: 'stacks-blockchain-api/feature-guides/transactions',
  },
  {
    type: 'doc',
    label: 'Search',
    id: 'stacks-blockchain-api/feature-guides/search-endpoint',
  },
  {
    type: 'doc',
    label: 'Pagination',
    id: 'stacks-blockchain-api/feature-guides/pagination',
  },
  {
    type: 'doc',
    label: 'Requesting Proofs',
    id: 'stacks-blockchain-api/feature-guides/requesting-proofs',
  },
  {
    type: 'doc',
    label: 'Nonce Handling',
    id: 'stacks-blockchain-api/feature-guides/nonce-handling',
  },
  {
    type: 'doc',
    label: 'Rosetta Support',
    id: 'stacks-blockchain-api/feature-guides/rosetta-support',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Interact via Stacks CLI',
    id: 'stacks-blockchain-api/how-to-guides/how-to-install-stacks-cli',
  },
  {
    type: 'doc',
    label: 'Run an instance of Stacks Blockchain API',
    id: 'stacks-blockchain-api/how-to-guides/how-to-run-stacks-blockchain-api-docker',
  },
  {
    type: 'doc',
    label: 'Spin up a Stacks API Node',
    id: 'stacks-blockchain-api/how-to-guides/how-to-run-api-node',
  },
  {
    type: 'doc',
    label: 'Upgrade version of Stacks Blockchain API',
    id: 'stacks-blockchain-api/how-to-guides/how-to-upgrade-stacks-blockchain-api',
  },
  {
    type: 'doc',
    label: 'Handling errors',
    id: 'stacks-blockchain-api/how-to-guides/how-to-handle-errors',
  },
  {
    type: 'html',
    value: 'Other',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'FAQ',
    id: 'stacks-blockchain-api/faq',
  },
  {
    type: 'doc',
    label: 'Troubleshooting',
    id: 'stacks-blockchain-api/troubleshooting',
  },
];
