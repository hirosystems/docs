import React from 'react';
import { CustomTable as Table } from '@/components/table';
import type { OpenAPIResponse } from './types';

interface ResponseTableProps {
  responses: Record<string, OpenAPIResponse>;
}

export function ResponseTable({ responses }: ResponseTableProps) {
  return (
    <div className="space-y-4">
      <Table>
        <thead>
          <tr>
            <th>Status code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(responses).map(([code, response]) => (
            <tr key={code}>
              <td>{code}</td>
              <td>{response.description || 'No description'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
