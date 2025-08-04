import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import React from 'react';
import { PackageInstall, type RawCode } from '@/components/docskit/components';
import { APISection } from './api-section';
import type { APIDocument, APIExport, APIKind } from './types';

interface APIProps {
  document: string | APIDocument;
  includes?: APIKind[];
  hasSource?: boolean;
}

export async function API({ document, includes, hasSource = true }: APIProps) {
  let apiDoc: APIDocument;

  if (typeof document === 'string') {
    try {
      // Handle relative paths by resolving them to the filesystem
      let filePath = document;

      // If it's a relative path starting with './', convert to absolute filesystem path
      if (document.startsWith('./')) {
        // Remove the './' and resolve relative to the current working directory
        filePath = join(process.cwd(), document.replace('./', ''));
      }

      const fileContent = await readFile(filePath, 'utf-8');
      apiDoc = JSON.parse(fileContent);
    } catch (error) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">
            Error loading document: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      );
    }
  } else {
    apiDoc = document;
  }

  // Filter exports based on includes prop
  const filteredExports = includes
    ? apiDoc.exports.filter((exp) => includes.includes(exp.kind))
    : apiDoc.exports;

  // Group exports by kind
  const groupedExports = filteredExports.reduce(
    (acc, exp) => {
      if (!acc[exp.kind]) {
        acc[exp.kind] = [];
      }
      acc[exp.kind].push(exp);
      return acc;
    },
    {} as Record<APIKind, APIExport[]>,
  );

  // Create the package install codeblock
  const packageCodeblock: RawCode = {
    value: apiDoc.name,
    lang: 'package-install',
    meta: '',
  };

  return (
    <main className="space-y-16">
      {/* Package Installation Section */}
      <div className="space-y-4">
        <h2 className="flex scroll-m-28 flex-row items-center gap-2 mt-0" id="installation">
          <a data-card="" href="#installation" className="peer">
            Installation
          </a>
        </h2>
        <PackageInstall codeblock={packageCodeblock} />
      </div>

      {/* Render each kind group */}
      {Object.entries(groupedExports).map(([kind, exports]) => (
        <div key={kind} className="space-y-12">
          {exports.map((apiExport, index) => (
            <React.Fragment
              key={`${kind}-${apiExport.name}-${apiExport.source?.fileName || ''}-${apiExport.source?.line || index}`}
            >
              <APISection apiExport={apiExport} hasSource={hasSource} />
              {/* Add divider after each section except the last one */}
              {index < exports.length - 1 && <hr className="border-t border-border my-12" />}
            </React.Fragment>
          ))}
        </div>
      ))}
    </main>
  );
}
