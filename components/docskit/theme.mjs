export default {
  name: "catppuccin-from-css",
  type: "from-css",
  tokenColors: [
    {
      scope: [
        "text",
        "source",
        "variable.other.readwrite",
        "punctuation.definition.variable",
      ],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "punctuation",
      settings: {
        foreground: "var(--ch-2)",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "var(--ch-3)",
      },
    },
    {
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: "constant.character.escape",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: [
        "constant.numeric",
        "variable.other.constant",
        "entity.name.constant",
        "constant.language.boolean",
        "constant.language.false",
        "constant.language.true",
        "keyword.other.unit.user-defined",
        "keyword.other.unit.suffix.floating-point",
      ],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.operator.word",
        "keyword.operator.new",
        "variable.language.super",
        "support.type.primitive",
        "storage.type",
        "storage.modifier",
        "punctuation.definition.keyword",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "entity.name.tag.documentation",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation.accessor",
        "punctuation.definition.generic",
        "meta.function.closure punctuation.section.parameters",
        "punctuation.definition.tag",
        "punctuation.separator.key-value",
      ],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: [
        "entity.name.function",
        "meta.function-call.method",
        "support.function",
        "support.function.misc",
        "variable.function",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "entity.name.class",
        "entity.other.inherited-class",
        "support.class",
        "meta.function-call.constructor",
        "entity.name.struct",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "entity.name.enum",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "meta.enum variable.other.readwrite",
        "variable.other.enummember",
      ],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "meta.property.object",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: [
        "meta.type",
        "meta.type-alias",
        "support.type",
        "entity.name.type",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "meta.annotation variable.function",
        "meta.annotation variable.annotation.function",
        "meta.annotation punctuation.definition.annotation",
        "meta.decorator",
        "punctuation.decorator",
      ],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: ["variable.parameter", "meta.function.parameters"],
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: ["constant.language", "support.function.builtin"],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: "entity.other.attribute-name.documentation",
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: ["keyword.control.directive", "punctuation.definition.directive"],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "punctuation.definition.typeparameters",
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: "entity.name.namespace",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "support.type.property-name.css",
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "variable.language.this",
        "variable.language.this punctuation.definition.variable",
      ],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: "variable.object.property",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: ["string.template variable", "string variable"],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "keyword.operator.new",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: "storage.modifier.specifier.extern.cpp",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: [
        "entity.name.scope-resolution.template.call.cpp",
        "entity.name.scope-resolution.parameter.cpp",
        "entity.name.scope-resolution.cpp",
        "entity.name.scope-resolution.function.definition.cpp",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "storage.type.class.doxygen",
      settings: {},
    },
    {
      scope: ["storage.modifier.reference.cpp"],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "meta.interpolation.cs",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "comment.block.documentation.cs",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: [
        "source.css entity.other.attribute-name.class.css",
        "entity.other.attribute-name.parent-selector.css punctuation.definition.entity.css",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "punctuation.separator.operator.css",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "source.css entity.other.attribute-name.pseudo-class",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "source.css constant.other.unicode-range",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "source.css variable.parameter.url",
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: ["support.type.vendored.property-name"],
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: [
        "source.css meta.property-value variable",
        "source.css meta.property-value variable.other.less",
        "source.css meta.property-value variable.other.less punctuation.definition.variable.less",
        "meta.definition.variable.scss",
      ],
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: [
        "source.css meta.property-list variable",
        "meta.property-list variable.other.less",
        "meta.property-list variable.other.less punctuation.definition.variable.less",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "keyword.other.unit.percentage.css",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "source.css meta.attribute-selector",
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: [
        "keyword.other.definition.ini",
        "punctuation.support.type.property-name.json",
        "support.type.property-name.json",
        "punctuation.support.type.property-name.toml",
        "support.type.property-name.toml",
        "entity.name.tag.yaml",
        "punctuation.support.type.property-name.yaml",
        "support.type.property-name.yaml",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: ["constant.language.json", "constant.language.yaml"],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: ["entity.name.type.anchor.yaml", "variable.other.alias.yaml"],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "support.type.property-name.table",
        "entity.name.section.group-title.ini",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "constant.other.time.datetime.offset.toml",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: [
        "punctuation.definition.anchor.yaml",
        "punctuation.definition.alias.yaml",
      ],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "entity.other.document.begin.yaml",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "markup.changed.diff",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: [
        "meta.diff.header.from-file",
        "meta.diff.header.to-file",
        "punctuation.definition.from-file.diff",
        "punctuation.definition.to-file.diff",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "markup.inserted.diff",
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: "markup.deleted.diff",
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: ["variable.other.env"],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: ["string.quoted variable.other.env"],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "support.function.builtin.gdscript",
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "constant.language.gdscript",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "comment meta.annotation.go",
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "comment meta.annotation.parameters.go",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "constant.language.go",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "variable.graphql",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "string.unquoted.alias.graphql",
      settings: {
        foreground: "var(--ch-14)",
      },
    },
    {
      scope: "constant.character.enum.graphql",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope:
        "meta.objectvalues.graphql constant.object.key.graphql string.unquoted.graphql",
      settings: {
        foreground: "var(--ch-14)",
      },
    },
    {
      scope: [
        "keyword.other.doctype",
        "meta.tag.sgml.doctype punctuation.definition.tag",
        "meta.tag.metadata.doctype entity.name.tag",
        "meta.tag.metadata.doctype punctuation.definition.tag",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: ["entity.name.tag"],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "text.html constant.character.entity",
        "text.html constant.character.entity punctuation",
        "constant.character.entity.xml",
        "constant.character.entity.xml punctuation",
        "constant.character.entity.js.jsx",
        "constant.charactger.entity.js.jsx punctuation",
        "constant.character.entity.tsx",
        "constant.character.entity.tsx punctuation",
      ],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "support.class.component",
        "support.class.component.jsx",
        "support.class.component.tsx",
        "support.class.component.vue",
      ],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: ["punctuation.definition.annotation", "storage.type.annotation"],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "constant.other.enum.java",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "storage.modifier.import.java",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope:
        "comment.block.javadoc.java keyword.other.documentation.javadoc.java",
      settings: {},
    },
    {
      scope: "meta.export variable.other.readwrite.js",
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: [
        "variable.other.constant.js",
        "variable.other.constant.ts",
        "variable.other.property.js",
        "variable.other.property.ts",
      ],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: [
        "variable.other.jsdoc",
        "comment.block.documentation variable.other",
      ],
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "storage.type.class.jsdoc",
      settings: {},
    },
    {
      scope: "support.type.object.console.js",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: ["support.constant.node", "support.type.object.module.js"],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "storage.modifier.implements",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: [
        "constant.language.null.js",
        "constant.language.null.ts",
        "constant.language.undefined.js",
        "constant.language.undefined.ts",
        "support.type.builtin.ts",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "variable.parameter.generic",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "keyword.declaration.function.arrow.js",
        "storage.type.function.arrow.ts",
      ],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "punctuation.decorator.ts",
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "keyword.operator.expression.in.js",
        "keyword.operator.expression.in.ts",
        "keyword.operator.expression.infer.ts",
        "keyword.operator.expression.instanceof.js",
        "keyword.operator.expression.instanceof.ts",
        "keyword.operator.expression.is",
        "keyword.operator.expression.keyof.ts",
        "keyword.operator.expression.of.js",
        "keyword.operator.expression.of.ts",
        "keyword.operator.expression.typeof.ts",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "support.function.macro.julia",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "constant.language.julia",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "constant.other.symbol.julia",
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "text.tex keyword.control.preamble",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "text.tex support.function.be",
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: "constant.other.general.math.tex",
      settings: {
        foreground: "var(--ch-14)",
      },
    },
    {
      scope:
        "comment.line.double-dash.documentation.lua storage.type.annotation.lua",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: [
        "comment.line.double-dash.documentation.lua entity.name.variable.lua",
        "comment.line.double-dash.documentation.lua variable.lua",
      ],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: [
        "heading.1.markdown punctuation.definition.heading.markdown",
        "heading.1.markdown",
        "heading.1.quarto punctuation.definition.heading.quarto",
        "heading.1.quarto",
        "markup.heading.atx.1.mdx",
        "markup.heading.atx.1.mdx punctuation.definition.heading.mdx",
        "markup.heading.setext.1.markdown",
        "markup.heading.heading-0.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: [
        "heading.2.markdown punctuation.definition.heading.markdown",
        "heading.2.markdown",
        "heading.2.quarto punctuation.definition.heading.quarto",
        "heading.2.quarto",
        "markup.heading.atx.2.mdx",
        "markup.heading.atx.2.mdx punctuation.definition.heading.mdx",
        "markup.heading.setext.2.markdown",
        "markup.heading.heading-1.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: [
        "heading.3.markdown punctuation.definition.heading.markdown",
        "heading.3.markdown",
        "heading.3.quarto punctuation.definition.heading.quarto",
        "heading.3.quarto",
        "markup.heading.atx.3.mdx",
        "markup.heading.atx.3.mdx punctuation.definition.heading.mdx",
        "markup.heading.heading-2.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "heading.4.markdown punctuation.definition.heading.markdown",
        "heading.4.markdown",
        "heading.4.quarto punctuation.definition.heading.quarto",
        "heading.4.quarto",
        "markup.heading.atx.4.mdx",
        "markup.heading.atx.4.mdx punctuation.definition.heading.mdx",
        "markup.heading.heading-3.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: [
        "heading.5.markdown punctuation.definition.heading.markdown",
        "heading.5.markdown",
        "heading.5.quarto punctuation.definition.heading.quarto",
        "heading.5.quarto",
        "markup.heading.atx.5.mdx",
        "markup.heading.atx.5.mdx punctuation.definition.heading.mdx",
        "markup.heading.heading-4.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "heading.6.markdown punctuation.definition.heading.markdown",
        "heading.6.markdown",
        "heading.6.quarto punctuation.definition.heading.quarto",
        "heading.6.quarto",
        "markup.heading.atx.6.mdx",
        "markup.heading.atx.6.mdx punctuation.definition.heading.mdx",
        "markup.heading.heading-5.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "markup.bold",
      settings: {
        foreground: "var(--ch-12)",
        fontStyle: "bold",
      },
    },
    {
      scope: "markup.italic",
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: "markup.strikethrough",
      settings: {
        foreground: "var(--ch-15)",
        fontStyle: "strikethrough",
      },
    },
    {
      scope: ["punctuation.definition.link", "markup.underline.link"],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "text.html.markdown punctuation.definition.link.title",
        "text.html.quarto punctuation.definition.link.title",
        "string.other.link.title.markdown",
        "string.other.link.title.quarto",
        "markup.link",
        "punctuation.definition.constant.markdown",
        "punctuation.definition.constant.quarto",
        "constant.other.reference.link.markdown",
        "constant.other.reference.link.quarto",
        "markup.substitution.attribute-reference",
      ],
      settings: {
        foreground: "var(--ch-16)",
      },
    },
    {
      scope: [
        "punctuation.definition.raw.markdown",
        "punctuation.definition.raw.quarto",
        "markup.inline.raw.string.markdown",
        "markup.inline.raw.string.quarto",
        "markup.raw.block.markdown",
        "markup.raw.block.quarto",
      ],
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: "fenced_code.block.language",
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: [
        "markup.fenced_code.block punctuation.definition",
        "markup.raw support.asciidoc",
      ],
      settings: {
        foreground: "var(--ch-2)",
      },
    },
    {
      scope: ["markup.quote", "punctuation.definition.quote.begin"],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "meta.separator.markdown",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: [
        "punctuation.definition.list.begin.markdown",
        "punctuation.definition.list.begin.quarto",
        "markup.list.bullet",
      ],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "markup.heading.quarto",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: [
        "entity.other.attribute-name.multipart.nix",
        "entity.other.attribute-name.single.nix",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "variable.parameter.name.nix",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "meta.embedded variable.parameter.name.nix",
      settings: {
        foreground: "var(--ch-16)",
      },
    },
    {
      scope: "string.unquoted.path.nix",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: ["support.attribute.builtin", "meta.attribute.php"],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "meta.function.parameters.php punctuation.definition.variable.php",
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "constant.language.php",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "text.html.php support.function",
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: "keyword.other.phpdoc.php",
      settings: {},
    },
    {
      scope: [
        "support.variable.magic.python",
        "meta.function-call.arguments.python",
      ],
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: ["support.function.magic.python"],
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: [
        "variable.parameter.function.language.special.self.python",
        "variable.language.special.self.python",
      ],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: ["keyword.control.flow.python", "keyword.operator.logical.python"],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "storage.type.function.python",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: [
        "support.token.decorator.python",
        "meta.function.decorator.identifier.python",
      ],
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: ["meta.function-call.python"],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "entity.name.function.decorator.python",
        "punctuation.definition.decorator.python",
      ],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "constant.character.format.placeholder.other.python",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: [
        "support.type.exception.python",
        "support.function.builtin.python",
      ],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: ["support.type.python"],
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "constant.language.python",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: ["meta.indexed-name.python", "meta.item-access.python"],
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "storage.type.string.python",
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: "meta.function.parameters.python",
      settings: {},
    },
    {
      scope: [
        "string.regexp punctuation.definition.string.begin",
        "string.regexp punctuation.definition.string.end",
      ],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "keyword.control.anchor.regexp",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "string.regexp.ts",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: [
        "punctuation.definition.group.regexp",
        "keyword.other.back-reference.regexp",
      ],
      settings: {
        foreground: "var(--ch-4)",
      },
    },
    {
      scope: "punctuation.definition.character-class.regexp",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "constant.other.character-class.regexp",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "constant.other.character-class.range.regexp",
      settings: {
        foreground: "var(--ch-17)",
      },
    },
    {
      scope: "keyword.operator.quantifier.regexp",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "constant.character.numeric.regexp",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: [
        "punctuation.definition.group.no-capture.regexp",
        "meta.assertion.look-ahead.regexp",
        "meta.assertion.negative-look-ahead.regexp",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: [
        "meta.annotation.rust",
        "meta.annotation.rust punctuation",
        "meta.attribute.rust",
        "punctuation.definition.attribute.rust",
      ],
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: [
        "meta.attribute.rust string.quoted.double.rust",
        "meta.attribute.rust string.quoted.single.char.rust",
      ],
      settings: {},
    },
    {
      scope: [
        "entity.name.function.macro.rules.rust",
        "storage.type.module.rust",
        "storage.modifier.rust",
        "storage.type.struct.rust",
        "storage.type.enum.rust",
        "storage.type.trait.rust",
        "storage.type.union.rust",
        "storage.type.impl.rust",
        "storage.type.rust",
        "storage.type.function.rust",
        "storage.type.type.rust",
      ],
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "entity.name.type.numeric.rust",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "meta.generic.rust",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "entity.name.impl.rust",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "entity.name.module.rust",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: "entity.name.trait.rust",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "storage.type.source.rust",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "entity.name.union.rust",
      settings: {
        foreground: "var(--ch-10)",
      },
    },
    {
      scope: "meta.enum.rust storage.type.source.rust",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: [
        "support.macro.rust",
        "meta.macro.rust support.function.rust",
        "entity.name.function.macro.rust",
      ],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: ["storage.modifier.lifetime.rust", "entity.name.type.lifetime"],
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "string.quoted.double.rust constant.other.placeholder.rust",
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope:
        "meta.function.return-type.rust meta.generic.rust storage.type.rust",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "meta.function.call.rust",
      settings: {
        foreground: "var(--ch-9)",
      },
    },
    {
      scope: "punctuation.brackets.angle.rust",
      settings: {
        foreground: "var(--ch-13)",
      },
    },
    {
      scope: "constant.other.caps.rust",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: ["meta.function.definition.rust variable.other.rust"],
      settings: {
        foreground: "var(--ch-11)",
      },
    },
    {
      scope: "meta.function.call.rust variable.other.rust",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
    {
      scope: "variable.language.self.rust",
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope: [
        "variable.other.metavariable.name.rust",
        "meta.macro.metavariable.rust keyword.operator.macro.dollar.rust",
      ],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: [
        "comment.line.shebang",
        "comment.line.shebang punctuation.definition.comment",
        "comment.line.shebang",
        "punctuation.definition.comment.shebang.shell",
        "meta.shebang.shell",
      ],
      settings: {
        foreground: "var(--ch-5)",
      },
    },
    {
      scope: "comment.line.shebang constant.language",
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: [
        "meta.function-call.arguments.shell punctuation.definition.variable.shell",
        "meta.function-call.arguments.shell punctuation.section.interpolation",
        "meta.function-call.arguments.shell punctuation.definition.variable.shell",
        "meta.function-call.arguments.shell punctuation.section.interpolation",
      ],
      settings: {
        foreground: "var(--ch-12)",
      },
    },
    {
      scope:
        "meta.string meta.interpolation.parameter.shell variable.other.readwrite",
      settings: {
        foreground: "var(--ch-6)",
      },
    },
    {
      scope: [
        "source.shell punctuation.section.interpolation",
        "punctuation.definition.evaluation.backticks.shell",
      ],
      settings: {
        foreground: "var(--ch-8)",
      },
    },
    {
      scope: "entity.name.tag.heredoc.shell",
      settings: {
        foreground: "var(--ch-7)",
      },
    },
    {
      scope: "string.quoted.double.shell variable.other.normal.shell",
      settings: {
        foreground: "var(--ch-1)",
      },
    },
  ],
  colors: {
    "editor.background": "var(--ch-18)",
    "editor.foreground": "var(--ch-1)",
    "editor.lineHighlightBackground": "var(--ch-19)",
    "editor.rangeHighlightBackground": "var(--ch-20)",
    "editor.infoForeground": "var(--ch-21)",
    "editor.selectionBackground": "var(--ch-22)",
    focusBorder: "var(--ch-7)",
    "tab.activeBackground": "var(--ch-18)",
    "tab.activeForeground": "var(--ch-7)",
    "tab.inactiveBackground": "var(--ch-23)",
    "tab.inactiveForeground": "var(--ch-3)",
    "tab.border": "var(--ch-23)",
    "tab.activeBorder": "#00000000",
    "editorGroup.border": "var(--ch-24)",
    "editorGroupHeader.tabsBackground": "var(--ch-25)",
    "editorLineNumber.foreground": "var(--ch-26)",
    "input.background": "var(--ch-27)",
    "input.foreground": "var(--ch-1)",
    "input.border": "#00000000",
    "icon.foreground": "var(--ch-7)",
    "sideBar.background": "var(--ch-23)",
    "sideBar.foreground": "var(--ch-1)",
    "sideBar.border": "#00000000",
    "list.activeSelectionBackground": "var(--ch-27)",
    "list.activeSelectionForeground": "var(--ch-1)",
    "list.hoverBackground": "var(--ch-28)",
    "list.hoverForeground": "var(--ch-1)",
    foreground: "var(--ch-1)",
    background: "var(--ch-18)",
    "lighter.inlineBackground": "var(--ch-29)",
    "terminal.ansiBlack": "var(--ch-30)",
    "terminal.ansiBlue": "var(--ch-9)",
    "terminal.ansiBrightBlack": "var(--ch-31)",
    "terminal.ansiBrightBlue": "var(--ch-9)",
    "terminal.ansiBrightCyan": "var(--ch-13)",
    "terminal.ansiBrightGreen": "var(--ch-4)",
    "terminal.ansiBrightMagenta": "var(--ch-5)",
    "terminal.ansiBrightRed": "var(--ch-12)",
    "terminal.ansiBrightWhite": "var(--ch-32)",
    "terminal.ansiBrightYellow": "var(--ch-10)",
    "terminal.ansiCyan": "var(--ch-13)",
    "terminal.ansiGreen": "var(--ch-4)",
    "terminal.ansiMagenta": "var(--ch-5)",
    "terminal.ansiRed": "var(--ch-12)",
    "terminal.ansiWhite": "var(--ch-33)",
    "terminal.ansiYellow": "var(--ch-10)",
  },
};
