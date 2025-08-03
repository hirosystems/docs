import SwaggerParser from '@apidevtools/swagger-parser';
import * as fs from 'fs/promises';

async function generateOpenAPI() {
  const url =
    'https://raw.githubusercontent.com/stacks-network/stacks-core/master/docs/rpc/openapi.yaml';

  try {
    // Validate the OpenAPI spec (optional but recommended)
    // await SwaggerParser.validate(url);
    // console.log("OpenAPI spec is valid.");

    // Dereference the spec, resolving all $ref pointers
    const api = await SwaggerParser.dereference(url);

    // Convert to JSON with pretty formatting
    const json = JSON.stringify(api, null, 2);

    // Save to a file (adjust the path as needed)
    await fs.writeFile('./openapi/stacks-node-rpc-api.json', json);
    console.log('OpenAPI JSON generated successfully.');
  } catch (err) {
    console.error('Error generating OpenAPI JSON:', err);
    process.exit(1); // Exit with error code to signal CI failure
  }
}

// Run the function
generateOpenAPI();
