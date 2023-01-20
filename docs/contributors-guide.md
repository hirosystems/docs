---
title: Hiro Contributor's Guide
---

# Introduction

One of the most important ways that we can work with you to build out the Stacks developer community and ecosystem is by having you contribute to our documentation. Having this feedback loop and insight into what works, and what does not work, for you is helpful in prioritizing what content we should write, what content needs to be updated, and content that may be missing.

This guide will help you to learn how to contribute to our docs and content so your feedback is received. We can then incorporate your comments to improve the overall developer documentation experience.

# **Contributing to Hiro Documentation**

We welcome all contributions to Hiro documentation. These contributions come in two forms: issues and pull requests.

## **Issues**

If you spot anything that is obsolete, technically inaccurate, or unclear, [please create a GitHub Issue](https://github.com/hirosystems/docs/issues/new). This is a great way to give us specific feedback and ensures that our content is up-to-date and technically accurate.

## **Pull Requests**

If you would like to suggest more comprehensive changes or updates to our content, you can make documentation changes and then submit a pull request.

For minor changes like typos, click "Edit This Page", located at the bottom of each document. This will take you to the source file on GitHub, where you can submit a pull request for your changes.

For larger edits or new documents, you can choose to edit the docs locally, following the steps described below.

### **Editing Docs Locally**

If you want to submit a pull request to update the docs, you will need to fork the Hiro Docs repo and then clone it.

Currently all Hiro docs are located in `/hirosystems/docs`

1. Create a branch and switch to it:
    
    `git checkout -b <branch-name>`
    
2. Add or modify the GitHub Markdown files in these directories.
3. When you are happy with your changes, commit them with a message summarizing what you did:
    
    `git commit -m "commit message"`
    
4. Push your branch up:
    
    `git push origin <branch-name>`
    

When you are satisfied with your changes, create a pull request from your branch by following [GitHub's guide](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

### **Titles and Descriptions**

Pull request titles should be descriptive enough for reviewers to understand *what* is being changed. Some ways of doing this are better than others:

Every pull request should have a description that explains *why* the change is being made. The description adds context that is critical for reviewers when giving feedback.

- If you are unfamiliar with GtHub, or need a quick refreshed, please refer to the [GitHub Get Started Guide](https://docs.github.com/en/get-started/using-git/about-git).
- For more tips, see GitHub's blog entry on [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request).
