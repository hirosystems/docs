---
title: Hiro Contributor's Guide
---

# Introduction

One of the most important ways that Hiro can innovate and improve the Stacks developer community and ecosystem is by having contributions to the Hiro product documentation. Having this feedback loop and insight into what works, and what does not work, is helpful in prioritizing what content to write, what content to update, and what content is missing.

This guide describes how to contribute to Hiro docs and content so feedback is received. The documentation team can then incorporate these comments to improve the overall developer documentation experience.

# **Contributing to hiro documentation**

Hiro welcomes all contributions to Hiro documentation. These contributions come in two forms: issues and pull requests.

## **Issues**

If content is obsolete, technically inaccurate, or unclear, [please create a GitHub Issue](https://github.com/hirosystems/docs/issues/new). This is a great way to give specific feedback and ensures that the content is up-to-date and technically accurate.

## **Pull requests**

To suggest more comprehensive changes or updates to our content, it is best to submit a pull request.

For minor changes like typos, click "Edit This Page", located at the bottom of each document. This goes to the source file on GitHub, where a pull request can be submitted for the changes.

For larger edits or new documents, edit the docs locally, following the steps described below.

### **Editing docs locally**

To submit a pull request to update the docs, fork the Hiro Docs repository and then clone it.

Currently all Hiro docs are located in `/hirosystems/docs`

1. Create a branch and switch to it:
    
    `git checkout -b <branch-name>`
    
2. Add or modify the GitHub Markdown files in these directories.
3. When the changes have been aded, commit them with a message summarizing the changes:
    
    `git commit -m "commit message"`
    
4. Push the branch up:
    
    `git push origin <branch-name>`
    

When all changes are finalized, create a pull request from the branch by following [GitHub's guide](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

### **Titles and descriptions**

Pull request titles should be descriptive enough for reviewers to understand *what* is being changed. Some ways of doing this are better than others.

make sure every pull request has a description that explains *why* the change is being made. The description adds context that is critical for reviewers when giving feedback.

- For quick GitHub refresher, please refer to the [GitHub Get Started Guide](https://docs.github.com/en/get-started/using-git/about-git).
- For more tips and tricks on using Git, see GitHub's blog entry on [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request).
