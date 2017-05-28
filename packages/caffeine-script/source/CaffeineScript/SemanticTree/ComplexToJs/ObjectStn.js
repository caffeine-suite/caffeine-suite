"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let StnRegistry, ObjectStn;
  StnRegistry = require("../../StnRegistry");
  return ObjectStn = Caf.defClass(
    class ObjectStn extends require("../BaseStn") {},
    function(ObjectStn, classSuper, instanceSuper) {
      let splitObjectsAtSameProps;
      this.prototype.toJs = function(options) {
        let out;
        out = `{${Caf.toString(
          Caf
            .each(this.children, [], (c, k, into) => {
              into.push(c.toJs());
            })
            .join(", ")
        )}}`;
        return Caf.exists(options) && options.dotBase
          ? `(${Caf.toString(out)})`
          : out;
      };
      this.prototype.toJsStatement = function() {
        return `(${Caf.toString(this.toJs())})`;
      };
      splitObjectsAtSameProps = function(children) {
        let currentDefined, listOfObjectLiterals, currentOrder;
        currentDefined = {};
        listOfObjectLiterals = [currentOrder = []];
        Caf.each(children, undefined, (child, k, into) => {
          let found, value;
          if (found = child.find(/ObjectPropNameStn/)) {
            [{ props: { value } }] = found;
            if (currentDefined[value]) {
              currentDefined = {};
              listOfObjectLiterals.push(currentOrder = []);
            }
            currentDefined[value] = true;
          }
          currentOrder.push(child);
        });
        return listOfObjectLiterals;
      };
      this.newInstance = function(props, children) {
        let listOfObjectLiterals;
        listOfObjectLiterals = splitObjectsAtSameProps(children);
        return listOfObjectLiterals.length === 1
          ? new this(props, children)
          : new StnRegistry.ArrayStn(
              Caf.each(listOfObjectLiterals, [], (c, k, into) => {
                into.push(new this(props, c));
              })
            );
      };
    }
  );
});
