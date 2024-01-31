/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

 const rootSidebar = require('./root')
 const platformSidebar = require('./platform')
 const hacksSidebar = require('./hacks')
 const exampleAppsSidebar = require('./example-apps')
 const tutorialsSidebar = require('./tutorials')
 const ordinalsExplorerSidebar = require('./ordinals-explorer');
 const ordinalsApiSidebar = require('./ordinals-api');
 const ordhookSidebar = require('./ordhook');
 const chainhookSidebar = require('./chainhook');
 const clarinetSidebar = require('./clarinet');
 const stacksExplorerSidebar = require('./stacks-explorer');
 const stacksJsSidebar = require('./stacks-js');
 const stacksCliSidebar = require('./stacks-cli');
 const stacksApiSidebar = require('./stacks-api');
 const tokenMetadataApiSidebar = require('./token-metadata-api');
 const subnetsSidebar = require('./subnets');

module.exports = {
  'docs': rootSidebar,
  'hacks': hacksSidebar,
  'platform': platformSidebar,
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
  'example-apps': exampleAppsSidebar,
  'tutorials': tutorialsSidebar,
  'stacks-cli': stacksCliSidebar,
};
