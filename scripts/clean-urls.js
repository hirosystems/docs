const fs = require('fs');
const path = require('path');

// Path to the generated JSON file
const filePath = path.join(process.cwd(), '.next', 'server', 'chunks', 'fumadocs_search.json');

// Check if the file exists
if (!fs.existsSync(filePath)) {
  console.error('File does not exist:', filePath);
  process.exit(1);
}

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Modify the URLs
  jsonData.forEach((entry) => {
    if (entry.url.startsWith('/docs/')) {
      entry.url = entry.url.replace(/^\/docs\//, '/');
    }
  });

  // Write the updated JSON back to the file
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
      return;
    }
    console.log('URLs updated successfully.');
  });
});