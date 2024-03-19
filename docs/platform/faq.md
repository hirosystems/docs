---
title: FAQs
---

### Are my projects and contracts isolated?

Your projects are deployed as pods in Kubernetes. Each pod operates with strict security context and resource limits. You are the only one to have access to the data.

### `clarinet devnet start` is not working in terminal

This feature is not supported. It is in the roadmap.

### I cannot import my project

Max project size allowed for imports is 50MB, so check the size before importing.

### I cannot download files from terminal

Internet access is unavailable inside VS Code and Terminal.

### Where do I log issues/bugs?

Use the [feedback widget inside Hiro Platform](https://hiro-pbc.canny.io/hiro-platform) or go directly to [https://hiro-pbc.canny.io/hiro-platform](https://hiro-pbc.canny.io/hiro-platform) to report issues.

### I see an error: 'Unable to retrieve contract ...' in the browser console. How do I resolve it?

Currently, "clarinet devnet start", and "requirements" aren't supported in Clarinet installed in Hiro Platform. These are on the roadmap.
