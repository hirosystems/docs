// scripts/generate-reference-docs.ts

import { ReferenceMarkdownGenerator } from '../lib/markdown-generator';
import fs from 'fs/promises';
import path from 'path';

// Configuration
const INPUT_JSON_PATH = process.argv[2] || './typedoc-output.json';
const OUTPUT_DIR = './content/docs/reference';
const OUTPUT_FILENAME = 'stacks-transactions.mdx';

async function generateReferenceDocs() {
  try {
    console.log('📚 Starting reference documentation generation...\n');

    // Read the TypeDoc JSON file
    console.log(`📖 Reading TypeDoc JSON from: ${INPUT_JSON_PATH}`);
    const jsonContent = await fs.readFile(INPUT_JSON_PATH, 'utf-8');
    const typeDocData = JSON.parse(jsonContent);

    console.log(`✅ Loaded ${typeDocData.name} v${typeDocData.version}`);
    console.log(`   Total exports: ${typeDocData.exports?.length || 0}`);

    // Generate the markdown
    console.log('\n🔨 Generating markdown...');
    const generator = new ReferenceMarkdownGenerator(typeDocData);
    const markdown = generator.generateFullDocument();

    // Ensure output directory exists
    const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILENAME);
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Write the markdown file
    console.log(`\n💾 Writing markdown to: ${outputPath}`);
    await fs.writeFile(outputPath, markdown, 'utf-8');

    // Calculate some stats
    const lines = markdown.split('\n').length;
    const size = Buffer.byteLength(markdown, 'utf-8');

    console.log(`\n✨ Generation complete!`);
    console.log(`   Lines: ${lines.toLocaleString()}`);
    console.log(`   Size: ${(size / 1024).toFixed(2)} KB`);
    console.log(
      `\n📄 View your documentation at: /docs/reference/${OUTPUT_FILENAME.replace('.mdx', '')}`,
    );
  } catch (error) {
    console.error('\n❌ Error generating documentation:', error);
    process.exit(1);
  }
}

// For testing with sample data
async function generateWithSampleData() {
  const sampleData = {
    name: '@stacks/transactions',
    version: '7.1.0',
    exports: [
      {
        name: 'Address',
        kind: 'Namespace',
        description: 'The Address namespace provides utilities for working with Stacks addresses.',
        source: {
          fileName: 'packages/transactions/src/namespaces/address.ts',
          line: 1,
          url: 'https://github.com/hirosystems/stacks.js/blob/c8267f2/packages/transactions/src/namespaces/address.ts#L1',
        },
      },
      {
        name: 'AddressRepr',
        kind: 'Type alias',
        description: 'Type representation for Stacks addresses',
        source: {
          fileName: 'packages/transactions/src/namespaces/address.ts',
          line: 8,
          url: 'https://github.com/hirosystems/stacks.js/blob/c8267f2/packages/transactions/src/namespaces/address.ts#L8',
        },
      },
      {
        name: 'fromPrivateKey',
        kind: 'Function',
        source: {
          fileName: 'packages/transactions/src/namespaces/address.ts',
          line: 90,
          url: 'https://github.com/hirosystems/stacks.js/blob/c8267f2/packages/transactions/src/namespaces/address.ts#L90',
        },
        signatures: [
          {
            parameters: [
              {
                name: 'privateKey',
                type: 'PrivateKey',
                description: 'The private key to convert.',
                optional: false,
              },
              {
                name: 'network',
                type: 'StacksNetwork | "mainnet" | "testnet" | "devnet" | "mocknet"',
                optional: true,
              },
            ],
            examples: [
              {
                code: "```ts\nimport { Address } from '@stacks/transactions';\n\nconst address = Address.fromPrivateKey('73a2f291df5a8ce3ceb668a25ac7af45639513af7596d710ddf59f64f484fd2801');\n// 'SP10J81WVGVB3M4PHQN4Q4G0R8586TBJH948RESDR'\n\nconst address = Address.fromPrivateKey('73a2f291df5a8ce3ceb668a25ac7af45639513af7596d710ddf59f64f484fd2801', 'testnet');\n// 'ST10J81WVGVB3M4PHQN4Q4G0R8586TBJH94CGRESQ'\n```",
              },
            ],
            description: 'Convert a private key to a single-sig C32 Stacks address.',
            returns: {
              type: 'string',
              description: 'The address string.',
            },
          },
        ],
      },
    ],
  };

  console.log('📚 Using sample data for testing...\n');

  // Generate the markdown
  const generator = new ReferenceMarkdownGenerator(sampleData);
  const markdown = generator.generateFullDocument();

  // Write to a test file
  const outputPath = path.join(OUTPUT_DIR, 'test-sample.mdx');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(outputPath, markdown, 'utf-8');

  console.log(`✅ Sample documentation generated at: ${outputPath}`);
  console.log(`\n📄 View at: /docs/reference/test-sample`);
}

// Main execution
if (require.main === module) {
  // Check if --sample flag is passed
  if (process.argv.includes('--sample')) {
    generateWithSampleData().catch(console.error);
  } else {
    generateReferenceDocs().catch(console.error);
  }
}

export { generateReferenceDocs, generateWithSampleData };
