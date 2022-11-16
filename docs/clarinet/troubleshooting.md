---
# The default id is the same as the one defined below. so not needed
title: Troubleshooting
---

This page answers some common issues you may encounter when using Clarinet. Updates will be made to this page regularly as we receive feedback and comments from our developer community.

## I am unable to run Clarinet after installation. 

> **_NOTE:_**
>
> The below steps are indented to address Windows users only.

If you cannot run Clarinet after you have installed it using the installer, perform the steps listed below.

1. Restart your shell/VSCode to ensure they have the updated path (the installer should have added the directory to the path).
2. If this does not resolve the issue, you must manually add the directory to your path.

To manually add the directory to your path:

1. Open "System Properties."
2. Click the "Environment Variables" button under "System variables."
3. Select "Path" and then click "Edit." 
4. Click the "New" button and add "C:\Program Files\clarinet\bin."
5. Follow the on-screen prompts and click "OK" after each prompt.
6. Restart your shell/VSCode.

If you did not install Clarinet to your default directory, you would need to modify the path so that Clarinet points to the correct directory. 
