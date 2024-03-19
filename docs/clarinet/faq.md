---
title: FAQs
---

#### **After installing Clarinet on Windows with the installer, how can I run Clarinet?**

- First, restart your shell/VSCode to ensure they have the updated Path (the installer should have added the directory to the path).
- If that does not work, manually add the directory to your Path by following the steps below:

  - Open "System Properties", select "Environment Variables" button, under "System variables", select "Path" and hit "Edit".
  - Press the "New" button and add "C:\Program Files\clarinet\bin", then press Ok, Ok, Ok.
  - Finally, restart your shell or VSCode.
  - If you did not install to the default directory, modify the path accordingly.

Below are some screenshots to help with this:

![FAQ - 2](images/clarinet-faq-1.png)

![FAQ - 2](images/clarinet-faq-2.png)

![FAQ - 2](images/clarinet-faq-3.png)

![FAQ - 2](images/clarinet-faq-4.png)

#### **The command `clarinet devnet start` is not working. How can I fix it?**

The local development environment uses Docker to run Bitcoin, Stacks nodes, and other services. To run the `clarinet devnet start` feature, you'll need to [install Docker](https://docs.docker.com/get-docker/). If you're on Linux, ensure you are set up in [rootless mode](https://docs.docker.com/engine/security/rootless/).

> **Note:** If you are running a version of `clarinet` below 2.1, the command is `clarinet integrate`. But we recommend you upgrade to the latest version.

#### **Where can I find the logs for the local development environment?**

If you're using Docker desktop, you can open the UI and select `stacks-node` container to see its logs.

If you are not using the Docker desktop, use the following command in your terminal:

`docker logs -f stacks-node.<project-name>.devnet`.
