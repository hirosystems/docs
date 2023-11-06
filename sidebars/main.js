/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

 const rootSidebar = require('./root')
 const hacksSidebar = require('./hacks')
 const ordinalsExplorerSidebar = require('./ordinals-explorer');
 const ordinalsApiSidebar = require('./ordinals-api');
 const ordhookSidebar = require('./ordhook');
 const chainhookSidebar = require('./chainhook');
 const clarinetSidebar = require('./clarinet');
 const stacksExplorerSidebar = require('./stacks-explorer');
 const stacksJsSidebar = require('./stacks-js');
 const stacksApiSidebar = require('./stacks-api');
 const tokenMetadataApiSidebar = require('./token-metadata-api');
 const subnetsSidebar = require('./subnets');

module.exports = {
  'docs': rootSidebar,
  'hacks': hacksSidebar,
  'ordinals-explorer': ordinalsExplorerSidebar,
  'ordinals-api': ordinalsApiSidebar,
  'ordhook': ordhookSidebar,
  'chainhook': chainhookSidebar,
  'clarinet': clarinetSidebar,
  'stacks-explorer': stacksExplorerSidebar,
  'stacks-js': stacksJsSidebar,
  'stacks-api': stacksApiSidebar,
  'token-metadata-api': tokenMetadataApiSidebar,
  'subnets': subnetsSidebar,
  tutorials: [
    'tutorials',
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
    }
  ]
};
