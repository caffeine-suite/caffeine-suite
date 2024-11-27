const path = require('path');
const { workspace, window } = require('vscode');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

let client;

function activate(context) {
  const serverModule = path.join(__dirname, 'server.js');
  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc }
  };

  const clientOptions = {
    documentSelector: [{ scheme: 'file', language: 'caffeine' }],
  };

  client = new LanguageClient('caffeineLanguageServer', 'Caffeine Language Server', serverOptions, clientOptions);
  client.start();
}

function deactivate() {
  if (!client) return undefined;
  return client.stop();
}

module.exports = { activate, deactivate };
