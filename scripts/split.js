const fs = require('fs');
const path = require('path');

// Get the arguments from the command line
const args = process.argv.slice(2);
const fileName = args[0]; // The name of the file to process (e.g., 'stacks-api')

// Define the input file path and output directory
const inputFilePath = path.join(__dirname, `../openapi/${fileName}.mdx`);
const outputBaseDir = path.join(__dirname, '../tmp');

// Read the content of the input MDX file
let content = fs.readFileSync(inputFilePath, 'utf8');

// Remove any </Root> component tags from the content
content = content.replace(/<\/Root>/g, '');

// Split the content into sections based on the <API> tags
const sections = content.split('<API>').slice(1); // Remove the first item if it's empty

// Ensure the output directory exists
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir, { recursive: true });
}

// Process each section
sections.forEach((section, index) => {
  // Re-add the <API> tag to the section
  section = `<API>${section}`;

  // Find the route for naming the file and directory structure
  const routeMatch = section.match(/route={"([^"]+)"}/);
  if (!routeMatch) {
    console.error('Could not find route for a section');
    return;
  }
  const routeParts = routeMatch[1].split('/').filter(Boolean); // Split and remove any empty strings
  const specificEndpoint = routeParts.join('-'); // Join parts with hyphens

  // Add syntax to left-align the content of each markdown table
  section = section.replace(/\| ([-:]+) \| ([-:]+) \|/g, '| :------ | :------ |');

  // Write the section to a new MDX file, ensuring space between frontmatter and content
  const outputFileName = `${specificEndpoint}.mdx`;
  const outputPath = path.join(outputBaseDir, outputFileName);
  fs.writeFileSync(outputPath, section);
  console.log(`Generated ${outputPath}`);
});

console.log('Splitting complete.');