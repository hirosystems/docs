---
title: FAQ
---

People unfamiliar with command line tools will install the clarity extension in VSCode and then type `clarity new <project name>` in the editor window and not know what to do next. Maybe we could add some clarifications about how to use command line tools somewhere? 

Also, adding more functionality into the extension will be helpful so that eventually, they don’t need to use the command line at all if they don’t want to. https://discord.com/channels/621759717756370964/625538774230892545/999051570635345970.

After installing Clarinet with the installer, I can’t run Clarinet.

- First, restart your shell/VSCode to ensure they have the updated Path (the installer should have added the directory to the path).
- If that does not work, manually add the directory to your Path: Open "System Properties", click "Environment Variables" button, under "System variables", select "Path" and hit "Edit". Press the "New" button and add "C:\Program Files\clarinet\bin", then press Ok, Ok, Ok. 
- Finally, restart your shell or VSCode.
- If you did not install to the default directory, modify the path accordingly.

Below are some screenshots to help with this:

![FAQ -1](images/clarinet-faq-1.png)

![FAQ -1](images/clarinet-faq-2.png)

![FAQ -1](images/clarinet-faq-3.png)

![FAQ -1](images/clarinet-faq-4.png)


- `clarinet integrate` is not working

check for rootless docker installation
