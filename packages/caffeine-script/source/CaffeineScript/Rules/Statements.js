"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["ControlOperatorStn"],
    [
      global,
      require("../StandardImport"),
      require("caffeine-eight"),
      require("../StnRegistry")
    ],
    ControlOperatorStn => {
      return {
        lineStartStatement: [
          "lineStartStatementWithoutEnd newLineStatementExtension* end",
          "importStatement"
        ],
        tailControlOperator: /\ *\b(if|while|until|unless) +/,
        tailControlOperatorComplexExpression:
          "tailControlOperator implicitArrayOrExpression",
        lineStartStatementWithoutEnd: [
          "lineStartExpression",
          "statementWithoutEnd"
        ],
        statementWithoutEnd: [
          "implicitArrayOrExpression !tailControlOperator",
          {
            pattern:
              "implicitArrayOrExpression tailControlOperatorComplexExpression+",
            getStn: function() {
              let stn;
              stn = this.implicitArrayOrExpression.getStn();
              Caf.each(
                this.tailControlOperatorComplexExpressions,
                undefined,
                tco => {
                  stn = ControlOperatorStn(
                    { operand: tco.tailControlOperator.toString().trim() },
                    tco.implicitArrayOrExpression.getStn(),
                    stn
                  );
                }
              );
              return stn;
            }
          }
        ],
        newLineStart: {
          pattern: /( *\n)+/,
          getPresent: function() {
            return false;
          }
        },
        importStatement: {
          pattern: "/import/ _? importFromList:valueList end importBody",
          stnFactory: "ImportStn"
        },
        importBody: ["root", { stnFactory: "ImportBodyStn" }],
        newLineStatementExtension: [
          "end lineStartBinaryOperatorAndExpression",
          "end &/\\??\\./ valueExtension+ binaryOperatorSequenceExtension?"
        ],
        lineOfStatements: {
          pattern: "statementSemi* statementWithoutEnd",
          stnFactory: "StatementsStn"
        },
        lineOfStatementsOrBlock: ["lineOfStatements", "statementBlock"],
        statementSemi: "statementWithoutEnd _? ';' _?"
      };
    }
  );
});
