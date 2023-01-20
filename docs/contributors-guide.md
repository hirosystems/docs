---
title: Hiro Contributor's Guide
---

# Introduction

One of the most important ways that Hiro can innovate and improve the Stacks developer community and ecosystem is by having contributions to the Hiro product documentation. Having this feedback loop and insight into what works, and what does not work, is helpful in prioritizing what content to write, what content to update, and what content is missing.

This guide describes how to contribute to Hiro docs and content so feedback is received. The documentation team can then incorporate these comments to improve the overall developer documentation experience.

# **Contributing to Hiro Documentation**

Hiro welcomes all contributions to Hiro documentation. These contributions come in two forms: issues and pull requests.

## **Issues**

If content is obsolete, technically inaccurate, or unclear, [please create a GitHub Issue](https://github.com/hirosystems/docs/issues/new). This is a great way to give specific feedback and ensures that Hiro content is up-to-date and technically accurate.

## **Pull requests**

To suggest more comprehensive changes or updates to our content, it is best to submit a pull request.

For minor changes like typos, click "Edit This Page", located at the bottom of each document. This will go to the source file on GitHub, where you can submit a pull request for your changes.

For larger edits or new documents, you may choose to edit the docs locally, following the steps described below.

### **Editing docs locally**

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

### **Titles and descriptions**

Pull request titles should be descriptive enough for reviewers to understand *what* is being changed. Some ways of doing this are better than others:

Every pull request should have a description that explains *why* the change is being made. The description adds context that is critical for reviewers when giving feedback.

- If you are unfamiliar with GtHub, or need a quick refreshed, please refer to the [GitHub Get Started Guide](https://docs.github.com/en/get-started/using-git/about-git).
- For more tips, see GitHub's blog entry on [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request).
