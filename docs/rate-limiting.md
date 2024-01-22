---
title: Rate Limiting
---

## Rate Limiting for Hiro APIs

The following rate-limits (in requests per minute, or RPM) are applicable for all Hiro APIs as of [November, 2023](https://www.hiro.so/blog/updated-rate-limits-for-hiro-apis):

- 50 requests per minute (RPM), per client IP, for unauthenticated traffic (without an API key)
- 500 requests per minute (RPM) with an authenticated API key, regardless of origin IP

These rate-limits apply across our 3 public-facing APIs: Stacks Blockchain API, Metadata API, and Ordinals API. The entirety of API traffic, regardless of whether it's from one or all of these APIs, will be attributed to a single default quota: 50 RPM for unauthenticated and 500 RPM for authenticated traffic.

In addition to RPM, we've introduced a secondary rate-limiting criteria: we now also limit requests to 20 per second (RPS) to ensure better utilization & resource protection, and to protect the API service from abuse. This applies to both authenticated and unauthenticated traffic.

These new rate limits help us ensure fair usage of Hiro APIs and provide the best possible service as our community of developers and applications grow.

Please [complete this form](https://survey.hiro.so/hiroapi) to apply for an API key.

### STX Faucet Rate Limit

The Stacks faucet rate limit depends on the type of request. For stacking requests, there is a limit of 1 request per 2 days. In case of regular Stacks faucet requests, the limit is set to 1 request per minute.
