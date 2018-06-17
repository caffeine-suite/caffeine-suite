"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return (() => {
    return {
      extractExpression: [
        "extractSource:value _ /extract/ _ extractionTarget",
        { stnFactory: "ExtractStn" }
      ],
      extractionTarget: "objectExtractionList",
      objectExtractionList: [
        "extractAction:extractAction _comma_ objectExtractionList",
        "extractAction:extractAction"
      ],
      extractAction: ["chainExtract", "extractToIdentifier"],
      chainExtract: [
        "extractSource:extractToIdentifier _ /extract/ _ extractionTarget",
        { stnFactory: "ExtractStn" }
      ],
      extractDefault: "_? '=' _? expression",
      extractAs: "_ 'as' _ identifier",
      extractToIdentifier: [
        "identifier extractAs:extractAs? extractDefault:extractDefault?",
        { stnFactory: "ExtractToIdentifierStn" }
      ]
    };
  })();
});
