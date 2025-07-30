// lib/markdown-generator.ts

interface TypeDocExport {
  name: string;
  kind: string;
  description?: string;
  source?: {
    fileName: string;
    line: number;
    url: string;
  };
  signatures?: Array<{
    parameters?: Array<{
      name: string;
      type: string;
      description?: string;
      optional: boolean;
    }>;
    examples?: Array<{
      code: string;
    }>;
    description?: string;
    returns?: {
      type: string;
      description?: string;
    };
  }>;
}

interface TypeDocJson {
  name: string;
  version: string;
  exports: TypeDocExport[];
  stats?: {
    totalExports: number;
    functions: number;
    classes: number;
    interfaces: number;
    types: number;
    totalExamples: number;
  };
}

export class ReferenceMarkdownGenerator {
  private typeDocData: TypeDocJson;
  private exports: TypeDocExport[];

  constructor(typeDocJson: TypeDocJson) {
    this.typeDocData = typeDocJson;
    this.exports = typeDocJson.exports || [];
  }

  private extractCodeFromExample(example: string): {
    language: string;
    code: string;
  } {
    const codeMatch = example.match(/```(\w+)?\n?([\s\S]*?)```/);
    if (codeMatch) {
      return {
        language: codeMatch[1] || 'typescript',
        code: codeMatch[2].trim(),
      };
    }
    return {
      language: 'typescript',
      code: example.trim(),
    };
  }

  private formatParameterType(type: string): string {
    return type.replace(/\s+/g, ' ').trim();
  }

  private escapeForMarkdown(text: string): string {
    // Escape special characters that might break markdown
    return text.replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  generateMethodSection(method: TypeDocExport): string {
    const sections: string[] = [];

    // Using Accordion JSX syntax
    sections.push(`<Accordion type="single" collapsible>`);
    sections.push(`  <AccordionItem value="${method.name}">`);
    sections.push(`    <AccordionTrigger>${method.name}</AccordionTrigger>`);
    sections.push(`    <AccordionContent>`);
    sections.push('');

    // Method description
    if (method.description) {
      sections.push(`      ${method.description}\n`);
    }

    const signature = method.signatures?.[0];
    if (!signature) {
      sections.push('      No signature information available.\n');
      sections.push('    </AccordionContent>');
      sections.push('  </AccordionItem>');
      sections.push('</Accordion>');
      return sections.join('\n');
    }

    // Parameters section using a table
    if (signature.parameters && signature.parameters.length > 0) {
      sections.push('#### Parameters\n');
      sections.push('| Name | Type | Required | Description |');
      sections.push('|:-----|:-----|:---------|:------------|');

      signature.parameters.forEach((param) => {
        const name = `\`${param.name}\``;
        const type = `\`${this.escapeForMarkdown(this.formatParameterType(param.type))}\``;
        const required = !param.optional ? ':required[Yes]' : 'No';
        const description = param.description ? this.escapeForMarkdown(param.description) : '-';

        sections.push(`| ${name} | ${type} | ${required} | ${description} |`);
      });
      sections.push('');
    }

    // Examples section
    if (signature.examples && signature.examples.length > 0) {
      sections.push('#### Example\n');

      if (signature.examples.length === 1) {
        const { language, code } = this.extractCodeFromExample(signature.examples[0].code);
        sections.push('```' + language);
        sections.push(code);
        sections.push('```\n');
      } else {
        // Multiple examples - use Tabs
        sections.push('<Tabs defaultValue="example-0" className="w-full">');
        sections.push('  <TabsList>');
        signature.examples.forEach((_, index) => {
          sections.push(
            `    <TabsTrigger value="example-${index}">Example ${index + 1}</TabsTrigger>`,
          );
        });
        sections.push('  </TabsList>');

        signature.examples.forEach((example, index) => {
          const { language, code } = this.extractCodeFromExample(example.code);
          sections.push(`  <TabsContent value="example-${index}">`);
          sections.push('');
          sections.push('```' + language);
          sections.push(code);
          sections.push('```');
          sections.push('');
          sections.push('  </TabsContent>');
        });

        sections.push('</Tabs>\n');
      }
    }

    // Returns section
    if (signature.returns) {
      sections.push('#### Returns\n');
      sections.push(`- **Type:** \`${this.escapeForMarkdown(signature.returns.type)}\``);
      if (signature.returns.description) {
        sections.push(`- **Description:** ${signature.returns.description}`);
      }
      sections.push('');
    }

    // Source link
    if (method.source) {
      const fileName = method.source.fileName.split('/').pop();
      sections.push(`> **Source:** [${fileName}:${method.source.line}](${method.source.url})`);
    }

    sections.push('');
    sections.push('    </AccordionContent>');
    sections.push('  </AccordionItem>');
    sections.push('</Accordion>');

    return sections.join('\n');
  }

  generateInstallationSection(): string {
    const packageName = this.typeDocData.name || '@stacks/transactions';

    return `## Installation

<Tabs defaultValue="npm" className="w-full">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
    <TabsTrigger value="yarn">yarn</TabsTrigger>
    <TabsTrigger value="bun">bun</TabsTrigger>
  </TabsList>
  <TabsContent value="npm">

\`\`\`bash
npm install ${packageName}
\`\`\`

  </TabsContent>
  <TabsContent value="pnpm">

\`\`\`bash
pnpm install ${packageName}
\`\`\`

  </TabsContent>
  <TabsContent value="yarn">

\`\`\`bash
yarn add ${packageName}
\`\`\`

  </TabsContent>
  <TabsContent value="bun">

\`\`\`bash
bun add ${packageName}
\`\`\`

  </TabsContent>
</Tabs>`;
  }

  generateQuickStats(): string {
    const functions = this.exports.filter((e) => e.kind === 'Function');
    const classes = this.exports.filter((e) => e.kind === 'Class');
    const interfaces = this.exports.filter((e) => e.kind === 'Interface');
    const types = this.exports.filter((e) => e.kind === 'Type alias');
    const namespaces = this.exports.filter((e) => e.kind === 'Namespace');

    return `## API Overview

| Type | Count |
|:-----|------:|
| Functions | ${functions.length} |
| Classes | ${classes.length} |
| Interfaces | ${interfaces.length} |
| Type Aliases | ${types.length} |
| Namespaces | ${namespaces.length} |
| **Total Exports** | **${this.exports.length}** |
`;
  }

  generateNamespaceSection(): string {
    const namespaces = this.exports.filter((e) => e.kind === 'Namespace');
    if (namespaces.length === 0) return '';

    const sections: string[] = ['## Namespaces\n'];

    namespaces.forEach((ns) => {
      sections.push(`### ${ns.name}\n`);

      if (ns.description) {
        sections.push(`${ns.description}\n`);
      }

      // Find all exports that belong to this namespace
      const namespaceFunctions = this.exports.filter((e) => {
        // Check if it's a direct namespace member (like Cl.bool)
        if (e.name.startsWith(ns.name + '.')) return true;

        // Check if the source file suggests it belongs to this namespace
        if (e.source?.fileName.includes(`/${ns.name.toLowerCase()}.ts`)) return true;

        // For Cl namespace, check if it's in the cl.ts file
        if (ns.name === 'Cl' && e.source?.fileName.includes('/cl.ts')) return true;

        // For Address namespace, check if it's in the address namespace file
        if (ns.name === 'Address' && e.source?.fileName.includes('/namespaces/address.ts'))
          return true;

        return false;
      });

      if (namespaceFunctions.length > 0) {
        sections.push(`<Accordion type="single" collapsible>`);

        namespaceFunctions.forEach((func) => {
          // Skip the namespace itself
          if (func.kind === 'Namespace') return;

          const functionName = func.name.startsWith(ns.name + '.')
            ? func.name.substring(ns.name.length + 1)
            : func.name;

          sections.push(`  <AccordionItem value="${ns.name}-${func.name}">`);
          sections.push(`    <AccordionTrigger>${ns.name}.${functionName}</AccordionTrigger>`);
          sections.push(`    <AccordionContent>`);

          if (func.description) {
            sections.push('');
            sections.push(`      ${func.description}\n`);
          }

          // Handle function signatures
          const signature = func.signatures?.[0];
          if (signature) {
            // Parameters
            if (signature.parameters && signature.parameters.length > 0) {
              sections.push('\n#### Parameters\n');
              sections.push('| Name | Type | Required | Description |');
              sections.push('|:-----|:-----|:---------|:------------|');

              signature.parameters.forEach((param) => {
                const name = `\`${param.name}\``;
                const type = `\`${this.escapeForMarkdown(this.formatParameterType(param.type))}\``;
                const required = !param.optional ? ':required[Yes]' : 'No';
                const description = param.description
                  ? this.escapeForMarkdown(param.description)
                  : '-';

                sections.push(`| ${name} | ${type} | ${required} | ${description} |`);
              });
              sections.push('');
            }

            // Examples
            if (signature.examples?.[0]) {
              sections.push('#### Example\n');
              const { language, code } = this.extractCodeFromExample(signature.examples[0].code);
              sections.push('```' + language);
              sections.push(code);
              sections.push('```\n');
            }

            // Returns
            if (signature.returns) {
              sections.push('#### Returns\n');
              sections.push(`- **Type:** \`${this.escapeForMarkdown(signature.returns.type)}\``);
              if (signature.returns.description) {
                sections.push(`- **Description:** ${signature.returns.description}`);
              }
              sections.push('');
            }
          }

          // Source link
          if (func.source) {
            const fileName = func.source.fileName.split('/').pop();
            sections.push(`> **Source:** [${fileName}:${func.source.line}](${func.source.url})`);
          }

          sections.push('');
          sections.push('    </AccordionContent>');
          sections.push('  </AccordionItem>');
        });

        sections.push(`</Accordion>\n`);
      }
    });

    return sections.join('\n');
  }

  generateFullDocument(): string {
    const sections: string[] = [];

    // Front matter
    const packageName = this.typeDocData.name || 'Package';
    const version = this.typeDocData.version || '';
    sections.push(`---`);
    sections.push(`title: ${packageName}`);
    sections.push(
      `description: API reference documentation for ${packageName}${version ? ` v${version}` : ''}`,
    );
    sections.push(`---\n`);

    sections.push(`# ${packageName}\n`);

    // Description
    sections.push(
      `> Comprehensive API documentation for all exported functions, types, and utilities in ${packageName}.\n`,
    );

    // Installation
    sections.push(this.generateInstallationSection());
    sections.push('\n');

    // Quick stats
    sections.push(this.generateQuickStats());
    sections.push('\n');

    // Namespaces
    const namespaceSection = this.generateNamespaceSection();
    if (namespaceSection) {
      sections.push(namespaceSection);
      sections.push('\n');
    }

    // Functions (not in namespaces)
    const standaloneFunctions = this.exports.filter((e) => {
      if (e.kind !== 'Function') return false;
      if (e.name.includes('.')) return false;

      // Check if this function belongs to a namespace based on file path
      const namespaces = this.exports.filter((ns) => ns.kind === 'Namespace');
      for (const ns of namespaces) {
        if (e.source?.fileName.includes(`/${ns.name.toLowerCase()}.ts`)) return false;
        if (e.source?.fileName.includes('/namespaces/')) return false;
      }

      return true;
    });

    if (standaloneFunctions.length > 0) {
      sections.push('## Functions\n');
      standaloneFunctions.forEach((func) => {
        sections.push(this.generateMethodSection(func));
        sections.push('');
      });
    }

    // Classes
    const classes = this.exports.filter((e) => e.kind === 'Class');
    if (classes.length > 0) {
      sections.push('## Classes\n');
      classes.forEach((cls) => {
        sections.push(`### ${cls.name}\n`);
        if (cls.description) {
          sections.push(`${cls.description}\n`);
        }
        if (cls.source) {
          const fileName = cls.source.fileName.split('/').pop();
          sections.push(`> [View source](${cls.source.url})\n`);
        }
      });
    }

    // Interfaces (using collapsible directive)
    const interfaces = this.exports.filter((e) => e.kind === 'Interface');
    if (interfaces.length > 0) {
      sections.push('## Interfaces\n');
      sections.push(':::collapsible{title="View all interfaces"}');
      sections.push('| Name | Description |');
      sections.push('|:-----|:------------|');
      interfaces.forEach((iface) => {
        const desc = iface.description ? this.escapeForMarkdown(iface.description) : '-';
        sections.push(`| **${iface.name}** | ${desc} |`);
      });
      sections.push(':::');
      sections.push('');
    }

    // Type aliases (using collapsible directive)
    const types = this.exports.filter((e) => e.kind === 'Type alias');
    if (types.length > 0) {
      sections.push('## Type Definitions\n');
      sections.push(':::collapsible{title="View all type definitions"}');
      sections.push('| Name | Description |');
      sections.push('|:-----|:------------|');
      types.forEach((type) => {
        const desc = type.description ? this.escapeForMarkdown(type.description) : '-';
        sections.push(`| **${type.name}** | ${desc} |`);
      });
      sections.push(':::');
      sections.push('');
    }

    return sections.join('\n');
  }
}
