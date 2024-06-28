const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const filesToDownload = [
  {
    url: 'https://raw.githubusercontent.com/hirosystems/stacks-blockchain-api/develop/docs/stacks-api.yaml',
    outputPath: './specs/stacks-api.yaml'
  }
  // Add more files here if needed
];

async function downloadFile(fileUrl, outputPath) {
  const response = await fetch(fileUrl);
  const data = await response.text();
  fs.writeFileSync(outputPath, data);
  console.log(`Downloaded ${path.basename(outputPath)}`);
}

async function main() {
  for (const file of filesToDownload) {
    await downloadFile(file.url, file.outputPath);
  }
}

main().catch(console.error);