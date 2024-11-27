const { TextDocument } = require('vscode-languageserver-textdocument');

// Legend for token types and modifiers
const tokenTypes = [
  'string',       // string.quoted.double.caffeine
  'keyword',      // keyword.caffeine
  'variable',     // entity.identifier.caffeine
  'comment',      // comment.line.caffeine
  'operator',     // keyword.operator.caffeine
];
const tokenModifiers = ['readonly', 'deprecated'];

const legend = { tokenTypes, tokenModifiers };

/**
 * Encodes a token for semantic highlighting.
 *
 * @param {number} line - Line number (0-based).
 * @param {number} startChar - Starting character (0-based).
 * @param {number} length - Length of the token.
 * @param {number} tokenTypeIndex - Index in the tokenTypes array.
 * @param {number} modifierBitmask - Bitmask for token modifiers.
 * @returns {number[]} Encoded token as a number array.
 */
function encodeToken(line, startChar, length, tokenTypeIndex, modifierBitmask) {
  return [line, startChar, length, tokenTypeIndex, modifierBitmask];
}

/**
 * Extracts semantic tokens from a document.
 *
 * @param {TextDocument} document - The document to analyze.
 * @returns {number[]} Encoded semantic tokens.
 */
function getSemanticTokens(document) {
  const tokens = [];
  const lines = document.getText().split('\n');

  lines.forEach((line, lineIndex) => {
    // Example: Match multiline string start (""" or """)
    const multilineMatch = line.match(/"""(.*)$/);
    if (multilineMatch) {
      const start = line.indexOf(multilineMatch[0]);
      tokens.push(encodeToken(lineIndex, start, multilineMatch[0].length, 0, 0)); // "string"
    }

    // Example: Match keywords
    const keywordMatch = line.match(/\b(if|else|while|class|extends)\b/);
    if (keywordMatch) {
      const start = line.indexOf(keywordMatch[0]);
      tokens.push(encodeToken(lineIndex, start, keywordMatch[0].length, 1, 0)); // "keyword"
    }

    // Add more tokenization logic as needed
  });

  return tokens;
}

module.exports = { getSemanticTokens, encodeToken, legend };
