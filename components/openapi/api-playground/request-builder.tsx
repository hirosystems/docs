"use client";

import { useState, forwardRef } from "react";
import { ClarityConverter, type ClarityTypeHint } from "./clarity-converter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { cvToHex, Cl } from "@stacks/transactions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { OpenAPIOperation, OpenAPIParameter } from "../types";

interface RequestBuilderProps {
  operation: OpenAPIOperation;
  onSubmit: (formData: Record<string, any>) => void;
  clarityConversion?: boolean;
  loading?: boolean;
  formData?: Record<string, string>;
  setFormData?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isPartial?: boolean;
}

export const RequestBuilder = forwardRef<HTMLFormElement, RequestBuilderProps>(
  (
    {
      operation,
      onSubmit,
      clarityConversion = false,
      loading = false,
      formData: externalFormData,
      setFormData: externalSetFormData,
      isPartial = false,
    },
    ref
  ) => {
    const [internalFormData, setInternalFormData] = useState<
      Record<string, string>
    >({});
    const formData = externalFormData || internalFormData;
    const setFormData = externalSetFormData || setInternalFormData;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [clarityPreviews, setClarityPreviews] = useState<
      Record<string, string>
    >({});

    const pathParams =
      operation.parameters?.filter((p) => p.in === "path") || [];
    const queryParams =
      operation.parameters?.filter((p) => p.in === "query") || [];
    const headerParams =
      operation.parameters?.filter((p) => p.in === "header") || [];

    const handleInputChange = (
      name: string,
      value: string,
      param?: OpenAPIParameter
    ) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      if (clarityConversion && param) {
        if (
          name === "body.arguments" ||
          (param.name === "arguments" && param.schema?.type === "array")
        ) {
          try {
            const args = parseArgumentsInput(value);
            const clarityArgs = args.map((arg) => {
              const cv = convertArgumentToClarity(arg);
              return ClarityConverter.clarityToString(cv);
            });
            setClarityPreviews((prev) => ({
              ...prev,
              [name]: `[${clarityArgs.join(", ")}]`,
            }));
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[name];
              return newErrors;
            });
          } catch (error) {
            setClarityPreviews((prev) => ({ ...prev, [name]: "Invalid" }));
            setErrors((prev) => ({
              ...prev,
              [name]: error instanceof Error ? error.message : "Invalid value",
            }));
          }
        } else {
          const clarityType = detectClarityType(
            param.name,
            param.schema || {},
            value
          );
          if (clarityType) {
            try {
              const clarityValue = ClarityConverter.convertToClarity(
                value,
                clarityType
              );
              const preview = ClarityConverter.clarityToString(clarityValue);
              setClarityPreviews((prev) => ({ ...prev, [name]: preview }));
            } catch (error) {
              setClarityPreviews((prev) => ({ ...prev, [name]: "Invalid" }));
              setErrors((prev) => ({
                ...prev,
                [name]:
                  error instanceof Error ? error.message : "Invalid value",
              }));
            }
          }
        }
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: Record<string, string> = {};
      const allParams = [...pathParams, ...queryParams, ...headerParams];

      for (const param of allParams) {
        if (param.required && !formData[param.name]) {
          newErrors[param.name] = "This field is required";
        }
      }

      if (operation.requestBody?.required) {
        const bodySchema =
          operation.requestBody.content?.["application/json"]?.schema;
        if (bodySchema?.type === "object" && bodySchema.properties) {
          for (const [propName, propSchema] of Object.entries(
            bodySchema.properties
          ) as [string, any][]) {
            if (
              bodySchema.required?.includes(propName) &&
              !formData[`body.${propName}`]
            ) {
              newErrors[`body.${propName}`] = "This field is required";
            }
          }
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      let finalFormData = { ...formData };
      if (operation.requestBody) {
        const bodySchema =
          operation.requestBody.content?.["application/json"]?.schema;
        if (bodySchema?.type === "object" && bodySchema.properties) {
          const bodyObject: Record<string, any> = {};

          for (const [propName, propSchema] of Object.entries(
            bodySchema.properties
          ) as [string, any][]) {
            const fieldValue = formData[`body.${propName}`];
            if (fieldValue !== undefined && fieldValue !== "") {
              if (clarityConversion) {
                if (propName === "arguments" && propSchema.type === "array") {
                  try {
                    const argValues = parseArgumentsInput(fieldValue);
                    bodyObject[propName] = argValues.map((arg) => {
                      const cv = convertArgumentToClarity(arg);
                      return cvToHex(cv);
                    });
                  } catch (error) {
                    console.error("Failed to convert arguments:", error);
                    bodyObject[propName] = fieldValue;
                  }
                } else {
                  if (propName === "sender") {
                    bodyObject[propName] = fieldValue;
                  } else {
                    const clarityType = detectClarityType(
                      propName,
                      propSchema,
                      fieldValue
                    );
                    if (clarityType) {
                      try {
                        const clarityValue = ClarityConverter.convertToClarity(
                          fieldValue,
                          clarityType
                        );
                        bodyObject[propName] = cvToHex(clarityValue);
                      } catch (error) {
                        bodyObject[propName] = fieldValue;
                      }
                    } else {
                      bodyObject[propName] = fieldValue;
                    }
                  }
                }
              } else {
                bodyObject[propName] = fieldValue;
              }
            }
          }

          finalFormData = {
            ...finalFormData,
            body: JSON.stringify(bodyObject, null, 2),
          };

          console.log("Built request body:", bodyObject);
          console.log("Final body JSON:", finalFormData.body);

          for (const key of Object.keys(formData)) {
            if (key.startsWith("body.")) {
              delete finalFormData[key];
            }
          }
        }
      }

      onSubmit(finalFormData);
    };

    const renderParameterInput = (param: OpenAPIParameter) => {
      const clarityType = clarityConversion
        ? detectClarityType(
            param.name,
            param.schema || {},
            formData[param.name] || ""
          )
        : null;
      const hasError = !!errors[param.name];

      return (
        <div key={param.name} className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={param.name} className="font-fono">
              {param.name}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            {clarityConversion && clarityType && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">Type: {clarityType}</p>
                    <p className="text-sm mt-1">
                      {ClarityConverter.getHint(clarityType)}
                    </p>
                    <p className="text-xs mt-1 font-mono">
                      Example: {ClarityConverter.getExample(clarityType)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <Input
            id={param.name}
            value={formData[param.name] || ""}
            onChange={(e) =>
              handleInputChange(param.name, e.target.value, param)
            }
            placeholder={param.example?.toString() || param.description}
            required={param.required}
            className={cn(
              "bg-white dark:bg-neutral-950 border-border/50",
              hasError && "border-red-500",
              "font-fono"
            )}
          />

          {hasError && (
            <p className="text-xs text-red-500">{errors[param.name]}</p>
          )}
        </div>
      );
    };

    // Parse arguments input - expects array format like [arg1, arg2] or [arg1, [nested1, nested2]]
    const parseArgumentsInput = (input: string): any[] => {
      const trimmed = input.trim();
      if (!trimmed) return [];

      if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
        throw new Error("Arguments must be in array format, e.g. [arg1, arg2]");
      }

      try {
        // Try to parse as JSON first
        const parsed = JSON.parse(trimmed);
        if (!Array.isArray(parsed)) {
          throw new Error("Arguments must be an array");
        }
        return parsed;
      } catch (jsonError) {
        // If JSON parsing fails, try manual parsing for simple cases
        // This handles cases like [SP123, 2] where addresses aren't quoted
        const content = trimmed.slice(1, -1).trim();
        if (!content) return [];

        // Simple split by comma (doesn't handle nested arrays)
        const parts = content.split(",").map((part) => {
          const cleaned = part.trim();

          // Check if it's a number
          if (/^-?\d+(\.\d+)?$/.test(cleaned)) {
            return Number.parseFloat(cleaned);
          }

          // Check if it's a boolean
          if (cleaned === "true" || cleaned === "false") {
            return cleaned === "true";
          }

          // Otherwise treat as string (addresses, etc)
          return cleaned;
        });

        return parts;
      }
    };

    // Convert a single argument to Clarity value
    const convertArgumentToClarity = (arg: any): any => {
      // Handle arrays (convert to Clarity lists)
      if (Array.isArray(arg)) {
        const elements = arg.map((item) => convertArgumentToClarity(item));
        return Cl.list(elements);
      }

      // Handle numbers
      if (typeof arg === "number") {
        return arg < 0 ? Cl.int(arg) : Cl.uint(arg);
      }

      // Handle booleans
      if (typeof arg === "boolean") {
        return Cl.bool(arg);
      }

      // Handle strings - check if it's an address
      if (typeof arg === "string") {
        // Check if it's a Stacks address
        if (/^(SP|ST)[A-Z0-9]{38,39}/.test(arg)) {
          try {
            if (arg.includes(".")) {
              const [address, contract] = arg.split(".");
              return Cl.contractPrincipal(address, contract);
            }
            return Cl.standardPrincipal(arg);
          } catch (error) {
            // If principal conversion fails, treat as string
            console.warn("Failed to convert to principal:", arg, error);
            return Cl.stringAscii(arg);
          }
        }

        // Otherwise treat as string
        return Cl.stringAscii(arg);
      }

      // Default to string for unknown types
      return Cl.stringAscii(String(arg));
    };

    // Auto-detect Clarity type based on field name, schema, and value
    const detectClarityType = (
      fieldName: string,
      schema: any,
      value: string
    ): ClarityTypeHint | null => {
      // Common field name patterns for Stacks blockchain
      const fieldLower = fieldName.toLowerCase();

      // Principal/Address detection
      if (
        fieldLower.includes("address") ||
        fieldLower.includes("principal") ||
        fieldLower.includes("sender") ||
        fieldLower.includes("recipient") ||
        fieldLower.includes("owner")
      ) {
        return "principal";
      }

      // Contract detection
      if (
        fieldLower.includes("contract") &&
        (fieldLower.includes("address") || fieldLower.includes("principal"))
      ) {
        return "principal";
      }

      // Arguments array
      if (fieldLower === "arguments" && schema.type === "array") {
        return "list";
      }

      // Amount/Balance (usually uint)
      if (
        fieldLower.includes("amount") ||
        fieldLower.includes("balance") ||
        fieldLower.includes("value")
      ) {
        return "uint";
      }

      // Boolean fields
      if (schema.type === "boolean") {
        return "bool";
      }

      // Integer fields
      if (schema.type === "integer") {
        return schema.minimum !== undefined && schema.minimum < 0
          ? "int"
          : "uint";
      }

      // Use ClarityConverter's auto-detection as fallback
      return null;
    };

    const renderRequestBody = () => {
      const bodySchema =
        operation.requestBody?.content?.["application/json"]?.schema;

      if (
        !bodySchema ||
        bodySchema.type !== "object" ||
        !bodySchema.properties
      ) {
        // Fallback to textarea for non-object schemas
        return (
          <div className="space-y-2">
            <Textarea
              id="request-body"
              value={formData.body || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Enter request body JSON"
              rows={6}
              className="font-mono text-sm dark:bg-neutral-800 dark:border-neutral-700"
            />
            {operation.requestBody?.description && (
              <p className="text-xs text-muted-foreground">
                {operation.requestBody.description}
              </p>
            )}
          </div>
        );
      }

      // Render individual fields for each property
      return (
        <div className="space-y-3">
          {Object.entries(bodySchema.properties).map(
            ([propName, propSchema]: [string, any]) => {
              const fieldName = `body.${propName}`;
              const isRequired = bodySchema.required?.includes(propName);
              const hasError = !!errors[fieldName];
              const clarityType = clarityConversion
                ? detectClarityType(
                    propName,
                    propSchema,
                    formData[fieldName] || ""
                  )
                : null;

              return (
                <div key={propName} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={fieldName} className="font-fono">
                      {propName}
                      {isRequired && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    {clarityConversion && clarityType && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-semibold">Type: {clarityType}</p>
                            <p className="text-sm mt-1">
                              {ClarityConverter.getHint(clarityType)}
                            </p>
                            <p className="text-xs mt-1 font-mono">
                              Example:{" "}
                              {ClarityConverter.getExample(clarityType)}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {propSchema.type === "array" ? (
                    <Textarea
                      id={fieldName}
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                      placeholder={
                        propSchema.example?.toString() ||
                        propSchema.description ||
                        (propName === "arguments"
                          ? "e.g. [SP123...] or [SP123..., 100] or [1, [2, 3, 4]]"
                          : "Enter array values as JSON array")
                      }
                      rows={3}
                      className={cn(
                        "font-mono text-sm bg-white dark:bg-neutral-950 border-border",
                        hasError && "border-red-500"
                      )}
                    />
                  ) : (
                    <Input
                      id={fieldName}
                      value={formData[fieldName] || ""}
                      onChange={(e) =>
                        handleInputChange(fieldName, e.target.value)
                      }
                      placeholder={
                        propSchema.example?.toString() || propSchema.description
                      }
                      required={isRequired}
                      className={cn(
                        "bg-white dark:bg-neutral-950 border-border font-fono",
                        hasError && "border-red-500"
                      )}
                    />
                  )}

                  {clarityPreviews[fieldName] && !hasError && (
                    <div className="space-y-1">
                      {propName === "arguments" && clarityConversion && (
                        <p className="text-xs font-mono text-muted-foreground">
                          {(() => {
                            try {
                              const args = parseArgumentsInput(
                                formData[fieldName] || ""
                              );
                              return args
                                .map((arg) => {
                                  const cv = convertArgumentToClarity(arg);
                                  return cvToHex(cv);
                                })
                                .join(", ");
                            } catch {
                              return "Invalid";
                            }
                          })()}
                        </p>
                      )}
                    </div>
                  )}

                  {hasError && (
                    <p className="text-xs text-red-500">{errors[fieldName]}</p>
                  )}
                </div>
              );
            }
          )}
        </div>
      );
    };

    return (
      <form
        ref={ref}
        onSubmit={isPartial ? (e) => e.preventDefault() : handleSubmit}
        className="space-y-6"
      >
        {/* Path Parameters */}
        {pathParams.length > 0 && (
          <div className="space-y-3">
            {pathParams.map(renderParameterInput)}
          </div>
        )}

        {/* Query Parameters */}
        {queryParams.length > 0 && (
          <div className="space-y-3">
            {queryParams.map(renderParameterInput)}
          </div>
        )}

        {/* Header Parameters */}
        {headerParams.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Headers
            </h4>
            {headerParams.map(renderParameterInput)}
          </div>
        )}

        {/* Request Body */}
        {operation.requestBody && renderRequestBody()}
      </form>
    );
  }
);

RequestBuilder.displayName = "RequestBuilder";
