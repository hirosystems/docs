import { ClarityConverter, type ClarityTypeHint } from "./clarity-converter";
import { cvToString } from "@stacks/transactions";
import type { OpenAPIOperation } from "../types";

interface ExecuteRequestOptions {
  proxyUrl?: string;
  auth?: {
    type: "bearer" | "api-key";
    value: string;
    headerName?: string;
  };
}

export async function executeRequest(
  operation: OpenAPIOperation,
  formData: Record<string, any>,
  baseUrl: string,
  clarityConversion: boolean,
  options?: ExecuteRequestOptions
): Promise<any> {
  let url = `${baseUrl}${operation.path}`;

  const pathParams = operation.parameters?.filter((p) => p.in === "path") || [];
  for (const param of pathParams) {
    const value = formData[param.name];
    if (!value) continue;

    if (clarityConversion && param.schema?.["x-clarity-type"]) {
      try {
        const clarityType = param.schema["x-clarity-type"] as ClarityTypeHint;
        const clarityValue = ClarityConverter.convertToClarity(
          value,
          clarityType
        );
        // For URL parameters, we need the string representation
        url = url.replace(
          `{${param.name}}`,
          encodeURIComponent(cvToString(clarityValue))
        );
      } catch (error) {
        // If conversion fails, use raw value
        url = url.replace(`{${param.name}}`, encodeURIComponent(value));
      }
    } else {
      url = url.replace(`{${param.name}}`, encodeURIComponent(value));
    }
  }

  const queryParams = new URLSearchParams();
  const queryParameters =
    operation.parameters?.filter((p) => p.in === "query") || [];
  for (const param of queryParameters) {
    const value = formData[param.name];
    if (!value || value.trim() === "") continue;

    if (clarityConversion && param.schema?.["x-clarity-type"]) {
      try {
        const clarityType = param.schema["x-clarity-type"] as ClarityTypeHint;
        const clarityValue = ClarityConverter.convertToClarity(
          value,
          clarityType
        );
        queryParams.append(param.name, cvToString(clarityValue));
      } catch (error) {
        queryParams.append(param.name, value);
      }
    } else {
      queryParams.append(param.name, value);
    }
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  // Build headers
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const headerParameters = operation.parameters?.filter((p) => p.in === "header") || [];
  for (const param of headerParameters) {
    const value = formData[param.name];
    if (value) {
      headers[param.name] = value;
    }
  }

  if (options?.auth) {
    if (options.auth.type === "bearer") {
      headers["Authorization"] = `Bearer ${options.auth.value}`;
    } else if (options.auth.type === "api-key" && options.auth.headerName) {
      headers[options.auth.headerName] = options.auth.value;
    }
  }

  let requestBody: any = undefined;
  if (
    formData.body &&
    (operation.requestBody ||
      ["POST", "PUT", "PATCH"].includes(operation.method.toUpperCase()))
  ) {
    try {
      // Parse and re-stringify to validate JSON
      const parsedBody = JSON.parse(formData.body);
      requestBody = parsedBody;
      console.log("Request body prepared:", requestBody);
    } catch (error) {
      console.error("Failed to parse body as JSON:", error);
      requestBody = formData.body;
    }
  } else {
    console.log(
      "No body to send. formData.body:",
      formData.body,
      "operation.requestBody:",
      operation.requestBody,
      "method:",
      operation.method
    );
  }

  const startTime = performance.now();

  try {
    let response;
    let endTime;

    if (options?.proxyUrl) {
      response = await fetch(options.proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          method: operation.method,
          headers,
          body: requestBody,
        }),
      });
      endTime = performance.now();

      // The proxy returns the actual response wrapped
      const proxyResponse = await response.json();
      return {
        ...proxyResponse,
        time: Math.round(endTime - startTime),
      };
    }
    
    // Direct request
    const requestOptions: RequestInit = {
      method: operation.method,
      headers,
    };

    if (requestBody !== undefined) {
      requestOptions.body = JSON.stringify(requestBody);
    }

    response = await fetch(url, requestOptions);
    endTime = performance.now();

    // Parse response
    let data;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers as any),
      data,
      time: Math.round(endTime - startTime),
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Network request failed"
    );
  }
}
