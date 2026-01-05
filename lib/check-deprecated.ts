import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface Operation {
  path: string;
  method: string;
}

/**
 * Check if any operations in an MDX file are deprecated based on the OpenAPI spec
 */
export async function checkIfDeprecated(mdxContent: string): Promise<boolean> {
  // Extract APIPage component from MDX content
  const apiPageMatch = mdxContent.match(/<APIPage[\s\S]*?\/>/);
  if (!apiPageMatch) return false;

  const apiPageStr = apiPageMatch[0];

  // Extract document path
  const documentMatch = apiPageStr.match(/document=["']([^"']+)["']/);
  if (!documentMatch) return false;

  const documentPath = documentMatch[1];

  // Extract operations array
  const operationsMatch = apiPageStr.match(/operations=\{(\[[\s\S]*?\])\}/);
  if (!operationsMatch) return false;

  let operations: Operation[];
  try {
    // Parse the operations array (it's JavaScript object syntax)
    const opsStr = operationsMatch[1]
      .replace(/path:/g, '"path":')
      .replace(/method:/g, '"method":')
      .replace(/'/g, '"');
    operations = JSON.parse(opsStr);
  } catch {
    return false;
  }

  // Load the OpenAPI document
  let filePath = documentPath;
  if (documentPath.startsWith('./')) {
    filePath = join(process.cwd(), documentPath.replace('./', ''));
  }

  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const apiDoc = JSON.parse(fileContent);

    // Check if any operation is deprecated
    for (const op of operations) {
      const pathItem = apiDoc.paths?.[op.path];
      const operation = pathItem?.[op.method.toLowerCase()];
      if (operation?.deprecated) {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
}
