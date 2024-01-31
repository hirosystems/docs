---
title: How to stop the service
---

# How to stop the Metadata service

When shutting down, you should always prefer to send the `SIGINT` signal instead of `SIGKILL.` Hence, the service has time to finish any pending background work, and all dependencies are gracefully disconnected.