const { createConnection, TextDocuments, ProposedFeatures } = require('vscode-languageserver');
const { TextDocument } = require('vscode-languageserver-textdocument');

// Create the connection
const connection = createConnection(ProposedFeatures.all);

// Manage documents
const documents = new TextDocuments(TextDocument);
documents.listen(connection);

// Semantic Token Types
const tokenTypes = ['string', 'variable', 'keyword'];
const tokenModifiers = [];

// Token Legend
const legend = { tokenTypes, tokenModifiers };

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: documents.syncKind,
      semanticTokensProvider: {
        legend,
        full: true
      }
    }
  };
});

function getSemanticTokens(document) {
  const tokens = [];
  const lines = document.getText().split('\n');

  lines.forEach((line, lineIndex) => {
    const match = line.match(/""".*/); // Example for multiline strings
    if (match) {
      const start = line.indexOf(match[0]);
      tokens.push(encodeToken(lineIndex, start, match[0].length, 0, 0)); // "string" type
    }
  });

  return tokens;
}

function encodeToken(line, startChar, length, tokenType, tokenModifiers) {
  return [line, startChar, length, tokenType, tokenModifiers];
}

// Provide semantic tokens
connection.languages.semanticTokens.on((params) => {
  const document = documents.get(params.textDocument.uri);
  const tokens = getSemanticTokens(document);
  return { data: tokens };
});

// Start listening
connection.listen();
