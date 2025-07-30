import type { OpenAPIOperation, CodeExample } from '../types';

export async function generateCodeExamples(
  operation: OpenAPIOperation,
  baseUrl: string,
): Promise<CodeExample[]> {
  const examples: CodeExample[] = [];

  // Generate cURL example
  const curlExample = generateCurlExample(operation, baseUrl);
  if (curlExample) {
    examples.push(curlExample);
  }

  // TODO: Add more languages (JavaScript, Python, etc.)

  return examples;
}

function generateCurlExample(operation: OpenAPIOperation, baseUrl: string): CodeExample {
  const url = `${baseUrl}${operation.path}`;
  const method = operation.method.toUpperCase();

  let curlCommand = `curl -L \\
  "${url}" \\
  -H 'Accept: application/json'`;

  // Add method if not GET
  if (method !== 'GET') {
    curlCommand = `curl -L -X ${method} \\
  "${url}" \\
  -H 'Accept: application/json'`;
  }

  // Add request body example if needed
  if (operation.requestBody && ['POST', 'PUT', 'PATCH'].includes(method)) {
    const content = operation.requestBody.content;
    const jsonContent = content?.['application/json'];

    if (jsonContent?.example) {
      curlCommand += ` \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(jsonContent.example, null, 2)}'`;
    }
  }

  // Add query parameters if present
  const queryParams = operation.parameters?.filter((p) => p.in === 'query');
  if (queryParams && queryParams.length > 0) {
    const queryString = queryParams.map((p) => `${p.name}=${p.example || `{${p.name}}`}`).join('&');

    curlCommand = curlCommand.replace(url, `${url}?${queryString}`);
  }

  // Add headers from parameters
  const headerParams = operation.parameters?.filter((p) => p.in === 'header');
  if (headerParams && headerParams.length > 0) {
    headerParams.forEach((header) => {
      curlCommand += ` \\
  -H '${header.name}: ${header.example || `{${header.name}}`}'`;
    });
  }

  return {
    lang: 'bash',
    code: curlCommand,
    title: 'cURL',
  };
}
