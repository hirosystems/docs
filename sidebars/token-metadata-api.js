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
    value: 'Token Metadata API',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Overview',
    id: 'token-metadata-api/index',
  },
  {
    type: 'doc',
    label: 'Getting Started',
    id: 'token-metadata-api/getting-started',
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
    id: 'token-metadata-api/feature-guides/token-metadata-api',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Stop service',
    id: 'token-metadata-api/how-to-guides/how-to-stop-service',
  },
  {
    type: 'doc',
    label: 'Use Image Cache Service',
    id: 'token-metadata-api/how-to-guides/how-to-use-image-cache-service',
  },
];
