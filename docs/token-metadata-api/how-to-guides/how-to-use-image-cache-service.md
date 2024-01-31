---
title: How to use Image Cache Service
---

# How to use Image Cache Service

The Token metadata API allows you to specify the path to a custom script that can pre-process every image URL detected by the service before it's inserted into the DB. This will enable you to serve CDN image URLs in your metadata responses instead of raw URLs, providing key advantages such as:

* Improves image load speed
* Increases reliability in case the original image becomes unavailable
* Protects original image hosts from [DDoS attacks](https://wikipedia.org/wiki/Denial-of-service_attack)
* Increases user privacy

An example IMGIX processor script is included in [`config/image-cache.js`](https://github.com/hirosystems/token-metadata-api/blob/master/config/image-cache.js).
You can customize the script path by altering the `METADATA_IMAGE_CACHE_PROCESSOR` environment variable.