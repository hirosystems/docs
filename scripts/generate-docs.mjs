import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./openapi/stacks-blockchain-api.json"],
  output: "./openapi",
});