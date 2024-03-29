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
    type: 'doc',
    label: 'Features',
    id: 'token-metadata-api/features',
  },
  {
    type: 'doc',
    label: 'Architecture',
    id: 'token-metadata-api/architecture-overview',
  },
  {
    type: 'html',
    value: 'Guides',
    className: 'section-title',
    defaultStyle: true,
  },
  {
    type: 'doc',
    label: 'Run as a service',
    id: 'token-metadata-api/feature-guides/run-as-a-service',
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
