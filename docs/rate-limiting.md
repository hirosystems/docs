---
title: Rate Limiting
---

## Rate Limiting for Hiro APIs

The following rate-limits (in requests per minute, or RPM) are applicable for all Hiro APIs as of [November, 2023](https://www.hiro.so/blog/updated-rate-limits-for-hiro-apis):

- 50 requests per minute, per client IP, for unauthenticated traffic (without an API key)
- 500 requests per minute (regardless of origin IP) with an authenticated API key

These new rate limits help us ensure fair usage of Hiro APIs and provide the best possible service as our community of developers and applications grow and scale.

Please [complete this form](https://survey.hiro.so/hiroapi) to apply for an API key.

### STX Faucet Rate Limit

The Stacks faucet rate limit depends on the type of request. For stacking requests, there is a limit of 1 request per 2 days. In case of regular Stacks faucet requests, the limit is set to 1 request per minute.
