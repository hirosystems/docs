import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./openapi/stacks-api.yaml"],
  output: "./content/docs/openapi",
});