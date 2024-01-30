module.exports = async function stacksJsDepsPlugin(_context, options) {
  return {
    name: 'stacksjs-deps-plugin',
    injectHtmlTags() {
      return {
        postBodyTags: [
          `
<script type="importmap" id="importmap">
  {
    "imports": {
      "@stacks/common": "https://esm.sh/@stacks/common@6.5.2",
      "@stacks/transactions": "https://esm.sh/@stacks/transactions@6.5.4",
      "@stacks/network": "https://esm.sh/@stacks/network@6.5.4",
      "@stacks/encryption": "https://esm.sh/@stacks/encryption@6.5.4",
      "@stacks/profile": "https://esm.sh/@stacks/profile@6.5.4",
      "@stacks/auth": "https://esm.sh/@stacks/auth@6.5.4",
      "@stacks/storage": "https://esm.sh/@stacks/storage@6.5.4",
      "@stacks/wallet-sdk": "https://esm.sh/@stacks/wallet-sdk@6.5.4",
      "@stacks/blockchain-api-client": "https://esm.sh/@stacks/blockchain-api-client@7.2.0",
      "@stacks/stacking": "https://esm.sh/@stacks/stacking@6.5.4",
      "@stacks/connect": "https://esm.sh/@stacks/connect@7.3.1",
      "@noble/hashes/sha256": "https://esm.sh/@noble/hashes@1.3.0/sha256",
      "crypto": "https://esm.sh/crypto-browserify@3.12.0",
      "zone-file": "https://esm.sh/zone-file@1.0.0"
    }
  }
</script>`,
        ],
      };
    },
  };
};
