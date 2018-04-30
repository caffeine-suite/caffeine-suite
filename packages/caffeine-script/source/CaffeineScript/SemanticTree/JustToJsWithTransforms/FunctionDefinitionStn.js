"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "merge"],
    [global, require("../../StandardImport")],
    (compactFlatten, merge) => {
      let StnRegistry, FunctionDefinitionStn;
      return (
        (StnRegistry = require("../../StnRegistry")),
        (FunctionDefinitionStn = Caf.defClass(
          class FunctionDefinitionStn extends require("../ScopeStnMixin")(
            require("../BaseStn")
          ) {
            constructor(props, children, pretransformedStn) {
              let onlyChild;
              if (children.length === 1) {
                [onlyChild] = children;
                if (
                  !(
                    onlyChild instanceof
                    StnRegistry.FunctionDefinitionArgsStn.class
                  )
                ) {
                  children = [
                    StnRegistry.FunctionDefinitionArgsStn(),
                    children[0]
                  ];
                }
              }
              super(props, children, pretransformedStn);
              this.arguments = children[0];
              this.statements = children[1];
              this._updatingArgumentScope = false;
            }
          },
          function(FunctionDefinitionStn, classSuper, instanceSuper) {
            this.getter({
              needsParens: function() {
                return false;
              },
              needsParensAsStatement: function() {
                return !this.props.bound;
              },
              childrenToUpdateScope: function() {
                return compactFlatten([this.statements]);
              },
              body: function() {
                return this.children[1];
              },
              args: function() {
                return this.children[0];
              },
              statementStns: function() {
                let cafBase;
                return Caf.exists((cafBase = this.body)) && cafBase.children;
              },
              argumentStns: function() {
                let cafBase;
                return Caf.exists((cafBase = this.args)) && cafBase.children;
              }
            });
            this.prototype.updateScope = function() {
              instanceSuper.updateScope.apply(this, arguments);
              return this.arguments
                ? (Caf.each(
                    this.arguments.argumentNameList,
                    {},
                    (name, cafK, cafInto) => {
                      cafInto[cafK] = this.addArgumentName(name);
                    }
                  ),
                  (this._updatingArgumentScope = true),
                  this.arguments.updateScope(this),
                  (this._updatingArgumentScope = false))
                : undefined;
            };
            this.prototype.addIdentifierAssigned = function(identifier) {
              return this._updatingArgumentScope
                ? this.addArgumentName(identifier)
                : instanceSuper.addIdentifierAssigned.apply(this, arguments);
            };
            this.prototype.postTransform = function() {
              let foundParent, newStatementStns, StatementsStn, cafBase;
              if (this.props.bound === "auto") {
                this.props.bound = (foundParent = this.pretransformedStn.findParent(
                  /Class|FunctionDefinition/
                ))
                  ? foundParent.type === "Class"
                    ? false
                    : true
                  : false;
              }
              return this.statementStns !==
                (newStatementStns = this.getPostTransformStatementStns())
                ? (({
                    FunctionDefinitionStn,
                    StatementsStn
                  } = require("../../StnRegistry")),
                  FunctionDefinitionStn(
                    (Caf.exists((cafBase = this.body)) &&
                      cafBase.children.length) > 0
                      ? this.props
                      : merge(this.props, { returnIgnored: true }),
                    this.children[0],
                    StatementsStn(newStatementStns)
                  ))
                : instanceSuper.postTransform.apply(this, arguments);
            };
            this.prototype.getPostTransformStatementStns = function() {
              let SuperStn,
                ArraySpreadElementStn,
                ReferenceStn,
                IdentifierStn,
                isConstructor,
                statementStns,
                preBodyStatements,
                lastSuperContainingStatementIndex;
              ({
                SuperStn,
                ArraySpreadElementStn,
                ReferenceStn,
                IdentifierStn
              } = require("../../StnRegistry"));
              ({ isConstructor } = this.props);
              ({ statementStns } = this);
              preBodyStatements = null;
              Caf.each(this.argumentStns, undefined, arg => {
                let stn;
                if ((stn = arg.generatePreBodyStatementStn())) {
                  (preBodyStatements != null
                    ? preBodyStatements
                    : (preBodyStatements = [])
                  ).push(stn);
                }
              });
              return compactFlatten(
                isConstructor
                  ? ((lastSuperContainingStatementIndex = null),
                    Caf.each(statementStns, undefined, (v, i) => {
                      if (
                        v.type === "Super" ||
                        v.find(/Super/, /FunctionDefinition|Class/)
                      ) {
                        lastSuperContainingStatementIndex = i;
                      }
                    }),
                    lastSuperContainingStatementIndex != null &&
                    lastSuperContainingStatementIndex >= 0
                      ? preBodyStatements
                        ? [
                            statementStns.slice(
                              0,
                              lastSuperContainingStatementIndex + 1
                            ),
                            preBodyStatements,
                            statementStns.slice(
                              lastSuperContainingStatementIndex + 1,
                              statementStns.length
                            )
                          ]
                        : statementStns
                      : [
                          SuperStn(
                            ArraySpreadElementStn(
                              IdentifierStn({ identifier: "arguments" })
                            )
                          ),
                          preBodyStatements,
                          statementStns
                        ])
                  : preBodyStatements
                    ? [preBodyStatements, statementStns]
                    : statementStns
              );
            };
            this.getter({
              autoLetsForSouceNode: function() {
                let lets;
                return (lets = this.getAutoLets()) ? lets + "; " : undefined;
              }
            });
            this.prototype.toSourceNode = function(options) {
              let isConstructor,
                bound,
                returnIgnored,
                argsSouceNode,
                bodySourceNode,
                cafTemp,
                cafBase,
                cafBase1;
              ({ isConstructor, bound, returnIgnored } = this.props);
              argsSouceNode =
                (cafTemp =
                  Caf.exists((cafBase = this.args)) &&
                  cafBase.toSourceNode()) != null
                  ? cafTemp
                  : "()";
              bodySourceNode =
                Caf.exists((cafBase1 = this.body)) &&
                cafBase1.toSourceNode({
                  returnAction: !(isConstructor || returnIgnored)
                });
              return bound
                ? this.createSourceNode(
                    argsSouceNode,
                    " => {",
                    this.autoLetsForSouceNode,
                    bodySourceNode,
                    "}"
                  )
                : this.createSourceNode(
                    isConstructor ? "constructor" : "function",
                    argsSouceNode,
                    " {",
                    this.autoLetsForSouceNode,
                    bodySourceNode,
                    "}"
                  );
            };
            this.prototype.getBodyJs = function() {
              let returnIgnored, isConstructor, statements, lets, cafBase;
              ({ returnIgnored, isConstructor } = this.props);
              statements =
                Caf.exists((cafBase = this.body)) &&
                cafBase.toFunctionBodyJsArray(
                  !(isConstructor || returnIgnored)
                );
              if ((lets = this.getAutoLets())) {
                statements = compactFlatten([lets, statements]);
              }
              return (Caf.exists(statements) && statements.length) > 0
                ? `${Caf.toString(statements.join("; "))};`
                : "";
            };
            this.prototype.getArgsJs = function() {
              let cafTemp, cafBase;
              return (cafTemp =
                Caf.exists((cafBase = this.children[0])) && cafBase.toJs()) !=
                null
                ? cafTemp
                : "()";
            };
            this.prototype.toJs = function() {
              let isConstructor, bound;
              ({ isConstructor, bound } = this.props);
              return bound
                ? `${Caf.toString(this.getArgsJs())} => {${Caf.toString(
                    this.getBodyJs()
                  )}}`
                : `${Caf.toString(
                    isConstructor ? "constructor" : "function"
                  )}${Caf.toString(this.getArgsJs())} {${Caf.toString(
                    this.getBodyJs()
                  )}}`;
            };
          }
        ))
      );
    }
  );
});
