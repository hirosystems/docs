export const runtime = "edge";

// Utility to map Clarity types to @stacks/transactions constructors
const clarityTypeToConstructor: { [key: string]: string[] } = {
  principal: ["standardPrincipalCV", "contractPrincipalCV"],
  bool: ["boolCV"],
  // Add mappings for other types as needed
};

// Adjusted generateImports function to include fixed imports
function generateImports(types: string[]) {
  let imports = [
    ...new Set(types.flatMap((type) => clarityTypeToConstructor[type] || type)),
  ].filter(Boolean);

  // Always include these imports for read-only calls
  imports.push("callReadOnlyFunction");
  const allImports = `import { ${imports.join(
    ", "
  )} } from '@stacks/transactions';\nimport { StacksTestnet } from '@stacks/network';\n`;

  return allImports;
}

// Adjusted function to generate code for read-only function calls
function generateReadOnlyFunctionCode(
  functions: any[],
  contractAddress: string,
  contractName: string
) {
  return functions
    .map((func) => {
      const funcArgs = func.args
        .map((arg: any) => {
          // Assuming all arguments are strings for simplicity
          if (arg.type === "principal") {
            return `${clarityTypeToConstructor[arg.type][1]}('{{${
              arg.name
            }}}')`;
          }
          return `${clarityTypeToConstructor[arg.type][0]}('{{${arg.name}}}')`;
        })
        .join(", ");
      const functionName = func.name;
      const senderAddress = "{{senderAddress}}"; // Placeholder for dynamic replacement
      return `
const contractAddress = '${contractAddress}';
const contractName = '${contractName}';
const functionName = '${functionName}';
const functionArgs = [${funcArgs}];
const network = new StacksTestnet();
const senderAddress = '${senderAddress}';

const options = {
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  network,
  senderAddress,
};

const result = await callReadOnlyFunction(options);
`;
    })
    .join("\n");
}

export async function GET(req: Request) {
  try {
    const response = await fetch(
      "https://api.mainnet.hiro.so/v2/contracts/interface/SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X/mega-vault",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter for read-only functions
    const readOnlyFunctions = data.functions.filter(
      (func: any) => func.access === "read_only"
    );

    console.log({ readOnlyFunctions });

    // Extract argument types for all read-only functions
    const argTypes = [
      ...new Set(
        readOnlyFunctions.flatMap((func: any) =>
          func.args.map((arg: any) => arg.type)
        )
      ),
    ] as string[];

    const contractAddress = "SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X"; // Placeholder, replace with actual contract address
    const contractName = "mega-vault"; // Placeholder, replace with actual contract name

    // Generate the import statement
    const importStatement = generateImports(argTypes);

    // Generate code for read-only function calls
    const readOnlyFunctionCode = generateReadOnlyFunctionCode(
      readOnlyFunctions,
      contractAddress,
      contractName
    );

    let codeBody = `\\\`\\\`\\\`tsx twoslash
    // @noErrors
    ${importStatement}\n
    ${readOnlyFunctionCode}
    \\\`\\\`\\\``;

    // Return the code body
    return Response.json(codeBody);
  } catch (error) {
    console.error("Error fetching contract interface:", error);
    return Response.json({ error });
  }
}
