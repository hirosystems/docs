---
title: Hiro Contributor's Guide
---

# Introduction

One of the most important ways Hiro can build out the Stacks developer community and ecosystem is by having developers contribute to Hiro documentation. Having this feedback loop and insight into what works, and what does not work, is helpful in prioritizing what content should be written, what content should be updated, and what content may be missing.

This guide describes how to contribute to Hiro documentation and content so feedback is received. The docs team can then incorporate these comments to improve the overall developer documentation experience.

# **Contributing to hiro documentation**

Hiro welcomes all contributions to Hiro documentation. These contributions come in two forms: issues and pull requests.

## **Issues**

If technical content is obsolete, technically inaccurate, or unclear, [please create a GitHub Issue](https://github.com/hirosystems/docs/issues/new). This is a great way to give specific feedback and ensures the content is up-to-date and technically accurate.

## **Pull requests**

To suggest more comprehensive changes or updates to the content, make documentation changes and then submit a pull request.

For minor changes like typos, click "Edit This Page," located at the bottom of each document. This goes to the source file on GitHub, where a pull request can be submitted.

For larger edits or new documents, edit the docs locally, following the steps described below.

### **Editing docs locally**

To submit a pull request to update the docs, fork the Hiro Docs repository and then clone the repository. Currently all Hiro docs are located in `/hirosystems/docs`

1. Create a branch and switch to that branch:
    
    `git checkout -b <branch-name>`
    
2. Add or modify the GitHub Markdown files in these directories.
3. When finished, commit them with a message summarizing what the changes:
    
    `git commit -m "commit message"`
    
4. Push the branch up:
    
    `git push origin <branch-name>`
    

When all changes are completed, create a pull request from the branch by following [GitHub's guide](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

### **Titles and descriptions**

When writing titles and descriptions, please keep the following in mind:

- Pull request titles should be descriptive enough for reviewers to understand *what* is being changed. Some ways of doing this are better than others.

- Every pull request should have a description that explains *why* the change is being made. The description adds context that is critical for reviewers when giving feedback.

- For a GitHub refresher, please refer to the [GitHub Get Started Guide](https://docs.github.com/en/get-started/using-git/about-git).
- For more tips, see GitHub's blog entry on [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request).
