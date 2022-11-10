---
title: Chainhooks
---

## Overview

Chainhooks are a powerful feature that enables you to automatically trigger an action based upon a predicate event occurring. Adhering to an event-based architecture, chainhooks allow you to pre-determine an underlying set of events that, when triggered, set into motion a logical series of follow-on steps and actions to address the specific event that was triggered. 

## Design

Chainhooks were designed with a very specific set of requirements and limitations to make them easy to work with in a development environment. These constraints include portability and performance.

- portability and performance

Hiro designed the event observer as a library, choosing to embed the library in Clarinet so you can run it on your local machine. You may also execute the library on the server side and then propagate these HTTP events to your other components.

- correctness

Due to the fact that blockchains can be forked, transactions can be discarded, and transactions can be added to a distinctly separate fork, ensuring correctness can be a challenge. There are many different ways you can end up with a state slightly differing from the canonical state, which is why correctness is an inherent limitation of chainhooks. 

## Using Chainhoolks

In terms of deployment lifecycle, you can start using chainhooks locally today, using the latest versions of Clarinet.

You may also choose to deploy chainhooks in your own environment, although this requires you to be responsible for your own depolyment instead of relying on Hiro's default deployment architecture.

## References

For a more detailed discussion of Chainhooks and how you can use them in your workflows, please see the following resources:

- [Meet 4 New Features in Clarinet](https://www.hiro.so/blog/meet-4-new-features-in-clarinet) blog post.
