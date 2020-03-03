"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Error", "upperCamelCase"],
    [global, require("./StandardImport")],
    (Error, upperCamelCase) => {
      let SemanticTree, DotReferenceStn;
      SemanticTree = require("../../StnRegistry");
      return (DotReferenceStn = Caf.defClass(
        class DotReferenceStn extends require("../BaseStn") {},
        function(DotReferenceStn, classSuper, instanceSuper) {
          this.getter({
            dotCount: function() {
              return this.props.dotCount;
            },
            accessIdentifier: function() {
              return this.props.accessIdentifier;
            },
            identifierStn: function() {
              let parent, child;
              ({ parent } = child = this);
              while (parent) {
                let dotReferenceAnchor, position;
                if (parent.type === "Statements") {
                  dotReferenceAnchor = parent.parent;
                  position = parent.children.indexOf(child);
                  if (position > 0) {
                    throw new Error(
                      "Dot references only supported in the first statement of a block (for now)"
                    );
                  }
                  if (!dotReferenceAnchor.getDotReferenceIdentifierStn) {
                    throw new Error(
                      `Dot references cannot be used inside ${Caf.toString(
                        upperCamelCase(dotReferenceAnchor.type, " ")
                      )}s (yet)`
                    );
                  }
                  return dotReferenceAnchor.getDotReferenceIdentifierStn(
                    this.dotCount
                  );
                } else {
                  ({ parent } = child = parent);
                }
              }
              return;
            }
          });
          this.prototype.transform = function() {
            let identifierStn, dotRefIdentifier;
            identifierStn = this.identifierStn;
            dotRefIdentifier = SemanticTree.IdentifierStn(
              this.identifierStn.props
            );
            return this.accessIdentifier
              ? SemanticTree.AccessorStn(
                  dotRefIdentifier,
                  SemanticTree.IdentifierStn({
                    identifier: this.accessIdentifier
                  })
                )
              : dotRefIdentifier;
          };
        }
      ));
    }
  );
});
