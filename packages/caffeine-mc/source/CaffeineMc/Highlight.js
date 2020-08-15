"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return {
    highlight: function (js) {
      let chalk,
        cardinal,
        normalizeChalkColor,
        keywordColor,
        operatorColor,
        functionDeclarationColor,
        itentifierColor,
        options;
      chalk = require("chalk");
      cardinal = require("cardinal");
      normalizeChalkColor = (clk) => (str) => clk(str);
      keywordColor = normalizeChalkColor(chalk.yellow);
      operatorColor = normalizeChalkColor(chalk.magenta);
      functionDeclarationColor = normalizeChalkColor(chalk.blue);
      itentifierColor = (str) => str;
      options = {
        linenos: true,
        theme: {
          Identifier: {
            undefined: keywordColor,
            null: keywordColor,
            _default: (s, info) => {
              let prevToken, nextToken;
              prevToken = info.tokens[info.tokenIndex - 1];
              nextToken = info.tokens[info.tokenIndex + 1];
              return (Caf.exists(nextToken) && nextToken.type) ===
                "Punctuator" &&
                (Caf.exists(nextToken) && nextToken.value) === "(" &&
                (Caf.exists(prevToken) && prevToken.type) === "Keyword" &&
                (Caf.exists(prevToken) && prevToken.value) === "function"
                ? functionDeclarationColor(s)
                : (Caf.exists(nextToken) && nextToken.value) === ":"
                ? functionDeclarationColor(s)
                : itentifierColor(s);
            },
          },
          Line: { _default: normalizeChalkColor(chalk.grey) },
          Block: { _default: normalizeChalkColor(chalk.grey) },
          Boolean: { _default: keywordColor },
          Null: { _default: keywordColor },
          Numeric: { _default: normalizeChalkColor(chalk.red) },
          String: { _default: normalizeChalkColor(chalk.green) },
          Keyword: { _default: keywordColor },
          Punctuator: { _default: operatorColor },
        },
      };
      return cardinal.highlight(js, options);
    },
  };
});
