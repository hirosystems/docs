'use client';

import { Cl, type ClarityValue, cvToJSON, cvToString } from '@stacks/transactions';

export type ClarityTypeHint =
  | 'uint'
  | 'int'
  | 'bool'
  | 'principal'
  | 'string-ascii'
  | 'string-utf8'
  | 'buffer'
  | 'list'
  | 'tuple'
  | 'optional';

export class ClarityConverter {
  private constructor() {}

  /**
   * Convert user input to appropriate Clarity value using Cl helper
   */
  static convertToClarity(value: string, hint?: ClarityTypeHint): ClarityValue {
    // Auto-detect type if no hint provided
    const type = hint || ClarityConverter.detectType(value);

    try {
      switch (type) {
        case 'uint':
          return Cl.uint(value);

        case 'int':
          return Cl.int(value);

        case 'bool':
          return Cl.bool(value.toLowerCase() === 'true');

        case 'principal':
          if (value.includes('.')) {
            const [address, contractName] = value.split('.');
            return Cl.contractPrincipal(address, contractName);
          }
          return Cl.standardPrincipal(value);

        case 'string-ascii':
          return Cl.stringAscii(value);

        case 'string-utf8':
          return Cl.stringUtf8(value);

        case 'buffer': {
          const hexValue = value.startsWith('0x') ? value : `0x${value}`;
          return Cl.buffer(Buffer.from(hexValue.slice(2), 'hex'));
        }

        case 'list': {
          const items = JSON.parse(value);
          if (!Array.isArray(items)) {
            throw new Error('Expected JSON array for list type');
          }
          return Cl.list(items.map((item) => ClarityConverter.convertToClarity(String(item))));
        }

        case 'tuple': {
          const obj = JSON.parse(value);
          if (typeof obj !== 'object' || obj === null) {
            throw new Error('Expected JSON object for tuple type');
          }
          const tupleData: Record<string, ClarityValue> = {};
          for (const [key, val] of Object.entries(obj)) {
            tupleData[key] = ClarityConverter.convertToClarity(String(val));
          }
          return Cl.tuple(tupleData);
        }

        case 'optional':
          if (value === 'none' || value === '') {
            return Cl.none();
          }
          return Cl.some(ClarityConverter.convertToClarity(value));

        default:
          throw new Error(`Unknown Clarity type: ${type}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to convert to ${type}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Auto-detect Clarity type from value
   */
  static detectType(value: string): ClarityTypeHint {
    // Principal (Stacks address)
    if (/^S[PT][A-Z0-9]{38,39}/.test(value)) {
      return 'principal';
    }

    // Boolean
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      return 'bool';
    }

    // Number (check for negative first)
    if (/^-?\d+$/.test(value)) {
      return parseInt(value) < 0 ? 'int' : 'uint';
    }

    // Buffer (hex string)
    if (/^(0x)?[0-9a-fA-F]+$/.test(value) && value.length > 8) {
      return 'buffer';
    }

    // List (JSON array)
    if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
      return 'list';
    }

    // Tuple (JSON object)
    if (value.trim().startsWith('{') && value.trim().endsWith('}')) {
      return 'tuple';
    }

    // Optional none
    if (value === 'none' || value === '') {
      return 'optional';
    }

    // Default to string-ascii
    return 'string-ascii';
  }

  /**
   * Convert Clarity value to string for display
   */
  static clarityToString(cv: ClarityValue): string {
    return cvToString(cv);
  }

  /**
   * Convert Clarity value to JSON
   */
  static clarityToJSON(cv: ClarityValue): any {
    return cvToJSON(cv);
  }

  /**
   * Get user-friendly hints for each type
   */
  static getHint(type: ClarityTypeHint): string {
    const hints: Record<ClarityTypeHint, string> = {
      uint: 'Unsigned integer (e.g., 123)',
      int: 'Signed integer (e.g., -123)',
      bool: 'Boolean value: true or false',
      principal:
        'Stacks address (e.g., SP2J6ZY48...) or contract (e.g., SP2J6ZY48...contract-name)',
      'string-ascii': 'ASCII string (e.g., hello)',
      'string-utf8': 'UTF-8 string with unicode support',
      buffer: 'Hex string with or without 0x prefix (e.g., 0x1234 or 1234)',
      list: 'JSON array (e.g., [1, 2, 3] or ["a", "b", "c"])',
      tuple: 'JSON object (e.g., {"name": "alice", "age": 30})',
      optional: 'Optional value - use "none" for empty or provide a value',
    };
    return hints[type] || 'Enter a value';
  }

  /**
   * Get example for each type
   */
  static getExample(type: ClarityTypeHint): string {
    const examples: Record<ClarityTypeHint, string> = {
      uint: '12345',
      int: '-12345',
      bool: 'true',
      principal: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9H6DPR',
      'string-ascii': 'hello-world',
      'string-utf8': 'Hello 世界',
      buffer: '0x48656c6c6f',
      list: '[1, 2, 3]',
      tuple: '{"name": "alice", "balance": 1000}',
      optional: 'none',
    };
    return examples[type] || '';
  }
}
