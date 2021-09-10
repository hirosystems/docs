#!/usr/bin/env node

/*

Before running this command, you should first update the cli-reference.json file with the Stacks CLI:

stx docs > src/_data/cli-reference.json

*/

const fs = require("fs");
const path = require("path");

var argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 <json_file> [options]")
  .default({ o: "./", f: "_commands.md" })
  .demandCommand(1)
  .alias("o", "outdir")
  .describe("o", "output directory")
  .alias("f", "filename")
  .describe("f", "output file name")
  .help("h")
  .alias("h", "help").argv;

const content = JSON.parse(fs.readFileSync(argv._[0]));

var markdown =
  "[//]: # (THIS IS AN AUTOMATICALLY GENERATED FILE, DO NOT EDIT BY HAND)\n\n";

content.forEach((entry) => {
  const { command, group, usage, args } = entry;

  markdown = `${markdown}### ${command}\n\n**Group:** ${group}\n\n${usage}\n\n| Name | Type | Value |\n|-|-|-|\n`;

  args.forEach((arg) => {
    const { name, type, value } = arg;

    markdown = `${markdown}| \`${name}\` | \`${type}\` | \`${value}\` |\n`;
  });

  markdown = `${markdown}\n`;
});

fs.writeFileSync(path.resolve(argv.o, argv.f), markdown, { flag: "w+" });
