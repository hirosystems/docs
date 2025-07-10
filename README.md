# Hiro Docs

Documentation for Hiro Systems PBC. Built with [Fumadocs](https://fumadocs.vercel.app/) and enhanced with custom components.

## Contributing

### Documentation Structure

**Component-Based** (`/tools/*`): Features organized by tool capabilities

Example structure:

```
/tools/clarinet/
├── Overview/                 # Introduction and setup
├── Clarinet CLI/             # Command-line features
├── Clarinet JS SDK/          # Testing and programmatic usage
└── Integrations/             # External connections
```

### Writing Guidelines

Follow our content rhythm pattern:

```
Paragraph (2-3 sentences) → Code Example → Paragraph → List/Table → Code
```

- **60% code, 40% text** - Show, don't just tell
- **Never put two paragraphs in a row** - Break with code/lists/tables
- **Every concept needs a code example**
- **Use complete, contextual sentences** - Explain "why" before "how"

### Available Components

#### Layout Components

````mdx
<Steps>
  <Step>
    ### Action verb phrase Context sentence explaining what and why. ```terminal
    $ command with options ```
  </Step>
</Steps>

---

<TerminalPicker storage="macOs" flags="-w">

```terminal !! macOS
$ brew install tool
```

```terminal !! Windows
$ winget install tool
```

</TerminalPicker>

---

<CodeTabs storage="languageSwitcher">

```typescript
const result = await contract.call();
```

```javascript
const result = await contract.call();
```

</CodeTabs>
````

#### Directives (Auto-converted to components)

<!-- prettier-ignore-start -->
```mdx
:::callout
type: tip|info|warn|help
### Optional Title
Content here
:::

:::objectives
- What you'll learn
- Another learning objective
:::

:::prerequisites
- Required knowledge
- Tools needed
:::

:::next-steps
- [Next Guide](/path): Description
- [Another Guide](/path): Description
:::
```
<!-- prettier-ignore-end -->

#### Interactive Components

```mdx
<Accordion>
  <AccordionItem>
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>

<ImageZoom src="/images/diagram.png" alt="Description" />
```

#### Code Block Features

**Languages**: `terminal`, `clarity`, `typescript`, `javascript`, `json`, `yaml`, `console`, `package-install`

**Flags**: `-n` (line numbers), `-c` (copy button), `-w` (word wrap), `-a` (animate)

**Annotations**:

````mdx
```ts
// !mark[3:5]     Highlight lines 3-5
// !mark[/regex/] Highlight pattern
// !diff +        Addition
// !diff -        Removal
// !collapse[3:5] Collapse lines
```
````

````

**Special blocks**:

```terminal
$ command         # Renders with prompt
```

```package-install
@stacks/connect  # Auto-generates npm/yarn/pnpm commands
```

````

### Page Templates

#### Overview Page

```mdx
---
title: Tool Name
sidebarTitle: Overview
description: Brief tool description
---

## Overview

Expand on what the tool does and its value. Include llms.txt link if available.

## Key features

- **Feature** - User benefit description
- **Feature** - Technical capability explained simply

## Installation

<TerminalPicker>...</TerminalPicker>

:::next-steps

- [Quickstart](/path): Get started in minutes
  :::
```

#### Quickstart Page

```mdx
---
title: Quickstart
description: Learn how to [task] with [tool]
---

Brief intro paragraph about what you'll build.

:::objectives

- Learning objective 1
- Learning objective 2
  :::

:::prerequisites

- Prerequisites
  :::

## Quickstart

<Steps>[3-5 focused steps]</Steps>

:::next-steps

- [Next Guide](/path): Description
  :::
```

### File Structure

- `/content/docs/` - All documentation content
- `/components/` - Custom components
- `/public/` - Images and static assets
- `meta.json` files control sidebar organization

### Quick Checklist

- Follow content rhythm (no consecutive paragraphs)
- 60% code, 40% text ratio
- Every concept has a code example
- Use appropriate page template
- Specify language for all code blocks
- Include context before code
- Keep paragraphs to 2-3 sentences
