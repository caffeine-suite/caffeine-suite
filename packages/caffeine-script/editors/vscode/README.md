# Dev

To work on these vscode extensions, create these symlnks:

```
~/.vscode/extensions/caffeinescript -> caffeine-script/editors/vscode/caffeinescript
~/.vscode/extensions/caffeinescriptcolors -> caffeine-script/editors/vscode/caffeinescriptcolors
```

https://vscode-docs.readthedocs.io/en/stable/extensions/install-extension/

Reload:

- Execute the workbench.action.reloadWindow command.
- Open the command palette (Ctrl + Shift + P) and execute the command:
  - Reload Window

https://stackoverflow.com/questions/42002852/how-to-restart-vscode-after-editing-extensions-config

# Useful VSCode Command Palette Tools

- Developer: Inspect Editor Tokens and Scopes
- Reload Window

# Publish

```
cd caffeinescript
npm run package
open .
```

- Go here: https://marketplace.visualstudio.com/manage/publishers/caffeine-script-publisher
- select the "..." menu on CaffeineScript and select update
- drag the vsix created (e.g. `caffeinescript-vscode-0.3.0.vsix`)
