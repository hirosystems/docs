const fs = require('fs');
const path = require('path');

// Path to the input MDX file
const inputFilePath = path.join(__dirname, '../content/docs/openapi/stacks-api.mdx');
// Base output directory for the split MDX files
const outputBaseDir = path.join(__dirname, '../content/docs/stacks/tests');

// Read the content of the input MDX file
const content = fs.readFileSync(inputFilePath, 'utf8');

// Split the content into sections based on the <API> tags
const sections = content.split('<API>').slice(1); // Remove the first item if it's empty

sections.forEach((section, index) => {
  // Inject custom className into <API> and <APIExample>, and ensure only one <Root> wrapper
  section = `<API className='api'>${section.replace(/<APIExample>/g, "<APIExample className='api-example xl:w-[50%]'>")}`;
  if (index !== sections.length - 1) {
    section = `<Root className='text-md'>\n${section}\n</Root>`; // Wrap with <Root> here if not the last section
  } else {
    section = `<Root className='text-md'>\n\n${section}`;
  }
  // Find the route for naming the file and directory structure
  const routeMatch = section.match(/route={"([^"]+)"}/);
  if (!routeMatch) {
    console.error('Could not find route for a section');
    return;
  }
  const routeParts = routeMatch[1].split('/').filter(Boolean); // Split and remove any empty strings
  if (routeParts.length < 3) {
    console.error('Unexpected route format:', routeMatch[1]);
    return;
  }
  const category = routeParts[2]; // Assuming 'extended/{version}/{category}/{specific-endpoint}'
  const specificEndpoint = routeParts.slice(3).join('-'); // Join remaining parts with hyphens

  // Extract title and description
  const titleMatch = section.match(/## (.+)/);
  const descriptionMatch = section.match(/## .+\n\n(.+)/);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  const description = descriptionMatch ? descriptionMatch[1] : 'No description available';

  // Generate the MDX frontmatter and imports with space between them and the content
  const frontMatterAndImports = `---
title: ${title}
description: ${description}
toc: false
---

import { Root, API, APIInfo, APIExample, Property } from 'fumadocs-ui/components/api'
import { Tabs, Tab } from 'fumadocs-ui/components/tabs'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

`;

  // Determine the output directory based on the category
  const outputDir = path.join(outputBaseDir, category);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the section to a new MDX file, ensuring space between frontmatter/imports and content
  const fileName = `${specificEndpoint}.mdx`;
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, frontMatterAndImports + section);
  console.log(`Generated ${outputPath}`);
});

console.log('Splitting complete.');