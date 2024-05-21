import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./openapi/api.yaml"],
  output: "./openapi",
});