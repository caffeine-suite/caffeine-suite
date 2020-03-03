"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "max", "merge", "Error"],
    [global, require("../../StandardImport")],
    (compactFlatten, max, merge, Error) => {
      let StnRegistry, FunctionDefinitionStn;
      StnRegistry = require("../../StnRegistry");
      return (FunctionDefinitionStn = Caf.defClass(
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
            if (this.statements) {
              if (!(this.statements.type === "Statements")) {
                throw new Error(
                  `statements must be type Statements (is: ${Caf.toString(
                    this.statements.type
                  )})`
                );
              }
            }
            this._updatingArgumentScope = false;
          }
        },
        function(FunctionDefinitionStn, classSuper, instanceSuper) {
          let preferredArgNames;
          this.getter({
            childrenToUpdateScope: function() {
              return compactFlatten([this.statements]);
            },
            body: function() {
              return this.statements;
            },
            statementStns: function() {
              let base;
              return Caf.exists((base = this.body)) && base.children;
            },
            argumentStns: function() {
              let base;
              return Caf.exists((base = this.arguments)) && base.children;
            },
            isDotReferenceAnchor: function() {
              return true;
            }
          });
          this.prototype.updateScope = function() {
            instanceSuper.updateScope.apply(this, arguments);
            return this.arguments
              ? ((this._updatingArgumentScope = true),
                this.arguments.updateScope(this),
                (this._updatingArgumentScope = false),
                Caf.object(this.arguments.argumentNameList, name =>
                  this.addExplicitlyDeclared(name)
                ))
              : undefined;
          };
          this.prototype.addIdentifierAssigned = function(identifier) {
            return this._updatingArgumentScope
              ? this.addExplicitlyDeclared(identifier)
              : instanceSuper.addIdentifierAssigned.apply(this, arguments);
          };
          this.prototype.findDotReferences = function(node, found) {
            if (node.constructor.type === "DotReference") {
              found.push(node);
            }
            if (!node.isDotReferenceAnchor) {
              Caf.each2(node.children, child =>
                this.findDotReferences(child, found)
              );
            }
            return found;
          };
          preferredArgNames = "abcdefghijklmnopqrstuvwxyz";
          this.prototype.extendArgumentsToAtLeast = function(count) {
            let children;
            children = this.arguments.children;
            return count > children.length
              ? ((children = [...children]),
                (() => {
                  while (count > children.length) {
                    children.push(
                      StnRegistry.FunctionDefinitionArgStn(
                        { rest: false, assignThisProperty: false },
                        StnRegistry.IdentifierStn({
                          preferredIdentifier:
                            preferredArgNames[children.length]
                        })
                      )
                    );
                  }
                })(),
                (this.children = [
                  (this.arguments = new this.arguments.class(
                    this.arguments.props,
                    children
                  )),
                  this.statements
                ]))
              : undefined;
          };
          this.prototype.getDotReferenceIdentifierStn = function(dotCount) {
            return this.arguments.children[dotCount - 1].identifierStn;
          };
          this.prototype.transform = function() {
            let dotRefs, maxDotCount, base;
            if ((Caf.exists((base = this.statementStns)) && base.length) > 0) {
              dotRefs = this.findDotReferences(this.statementStns[0], []);
              maxDotCount = 0;
              Caf.each2(
                this.findDotReferences(this.statementStns[0], []),
                dotRef => (maxDotCount = max(maxDotCount, dotRef.dotCount))
              );
              this.extendArgumentsToAtLeast(maxDotCount);
            }
            return instanceSuper.transform.apply(this, arguments);
          };
          this.prototype.postTransform = function() {
            let foundParent, newStatementStns, StatementsStn, base;
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
                  (Caf.exists((base = this.body)) && base.children.length) > 0
                    ? this.props
                    : merge(this.props, { returnIgnored: true }),
                  this.arguments,
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
            Caf.each2(this.argumentStns, arg => {
              let stn;
              return (stn = arg.generatePreBodyStatementStn())
                ? (preBodyStatements != null
                    ? preBodyStatements
                    : (preBodyStatements = [])
                  ).push(stn)
                : undefined;
            });
            return compactFlatten(
              isConstructor
                ? ((lastSuperContainingStatementIndex = null),
                  Caf.each2(
                    statementStns,
                    (v, i) => (lastSuperContainingStatementIndex = i),
                    (v, i) =>
                      v.type === "Super" ||
                      v.find(/Super/, /FunctionDefinition|Class/)
                  ),
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
            autoLetsForSourceNode: function() {
              let lets;
              return (lets = this.getAutoLets()) ? lets + "; " : undefined;
            },
            bound: function() {
              return this.props.bound;
            },
            simpleBound: function() {
              let statementStns;
              ({ statementStns } = this);
              return (
                this.bound &&
                !this.getAutoLets() &&
                (Caf.exists(statementStns) && statementStns.length) === 1 &&
                statementStns[0].type !== "Object"
              );
            }
          });
          this.prototype.toSourceNode = function(options) {
            let isConstructor,
              bound,
              returnIgnored,
              statement,
              isOperand,
              returnAction,
              argsSourceNode,
              bodySourceNode,
              temp,
              base,
              base1;
            ({ isConstructor, bound, returnIgnored } = this.props);
            if (options) {
              ({ statement, isOperand } = options);
            }
            returnAction = !(isConstructor || returnIgnored);
            argsSourceNode =
              (temp =
                Caf.exists((base = this.arguments)) && base.toSourceNode()) !=
              null
                ? temp
                : "()";
            bodySourceNode = this.simpleBound
              ? this.body.children[0].toSourceNode({ expression: true })
              : Caf.exists((base1 = this.body)) &&
                base1.toSourceNode({ returnAction });
            return bound
              ? this.simpleBound
                ? this.createSourceNode(
                    isOperand ? "(" : undefined,
                    argsSourceNode,
                    " => ",
                    bodySourceNode,
                    isOperand ? ")" : undefined
                  )
                : this.createSourceNode(
                    isOperand ? "(" : undefined,
                    argsSourceNode,
                    " => {",
                    this.autoLetsForSourceNode,
                    bodySourceNode,
                    "}",
                    isOperand ? ")" : undefined
                  )
              : this.createSourceNode(
                  statement ? "(" : undefined,
                  isConstructor ? "constructor" : "function",
                  argsSourceNode,
                  " {",
                  this.autoLetsForSourceNode,
                  bodySourceNode,
                  "}",
                  statement ? ")" : undefined
                );
          };
        }
      ));
    }
  );
});
