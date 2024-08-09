import { generateFiles } from "fumadocs-openapi"

void generateFiles({
  input: ["./openapi/stacks-api.json", "./openapi/token-metadata-api.json", "./openapi/ordinals-api.json", "./openapi/runes-api.json", "./openapi/platform-api.json"],
  output: "./openapi/spec"
})
