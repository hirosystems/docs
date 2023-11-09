---
title: Rate Limiting
---

## Rate Limiting for Hiro APIs

Hiro’s Rate Limit per Minute (RPM) is applied to all Hiro-hosted API services. As of November 9th, 2023, our policy is:

- 50 RPM per client IP for unauthenticated traffic (without an API key)
- 500 RPM per client IP with an authenticated API key

These new rate limits help us ensure fair usage of Hiro APIs and provide the best possible service as our community of developers and applications grow and scale.

If you’re interested in the higher 500 RPM limit, please [complete this form](https://survey.hiro.so/hiroapi) to apply for an API key.

### STX Faucet Rate Limit

The Stacks faucet rate limit depends on the type of request. For stacking requests, there is a limit of 1 request per 2 days. In case of regular Stacks faucet requests, the limit is set to 1 request per minute.
