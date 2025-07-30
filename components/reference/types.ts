export interface APISource {
  fileName: string;
  line: number;
  url: string;
}

export interface APIParameter {
  name: string;
  type: string;
  description?: string;
  optional: boolean;
}

export interface APIExample {
  code: string;
}

export interface APIReturns {
  type: string;
  description?: string;
}

export interface APISignature {
  parameters: APIParameter[];
  examples?: APIExample[];
  description?: string;
  returns?: APIReturns;
}

export interface APIExport {
  name: string;
  kind: 'Function' | 'Type alias' | 'Namespace' | 'Class' | 'Interface' | 'Variable' | 'Enum';
  source?: APISource;
  signatures?: APISignature[];
  description?: string;
}

export interface APIDocument {
  name: string;
  version: string;
  exports: APIExport[];
}

export type APIKind = APIExport['kind'];
