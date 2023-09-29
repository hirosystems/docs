---
Title: How to use API key
---

# How to use API Key

API keys are alpha-numeric codes that identify and authenticate an application or developer. You can use API keys to control access to your API calls.

# Steps to use API Key

This guide helps you with the steps to use the API key to interact with the API.

> :::caution
> The API key is passed in the **header** of your HTTP API request and is used only for private use, like in server-side applications. This key is not to be exposed or shared; if you use the API key in your client-side application (E.g., frontend, browser-based applications), attackers can capture it using the client tools (E.g., browser console) and abuse your API key.

There are multiple ways to interact with the API endpoints. In this guide, we will walk through the following approaches with the help of an API endpoint.

- cURL
- Typescript client

## Using cURL

Using cURL, you will pass the API key in an `x-hiro-api-key` header. Use the following command as an example to call the API endpoint `https://api.hiro.so/<your-api-endpoint>`.

```sh
curl https://api.hiro.so/... -H 'x-hiro-api-key: <your-API-value>'
```

## Using the API key in Typescript

The following Typescript snippet demonstrates the instantiation of  RESTful HTTP requests with an API key.

```typescript
function <your-api-function>(apiKey: string) {
  const url = `https://api.hiro.so/<your-api-endpoint>`;
  const headers = new Headers();
  headers.append("x-hiro-api-key", ${apiKey});

  return fetch(url, {
    headers: headers
  })
    .then(response => response.json());
}
```
