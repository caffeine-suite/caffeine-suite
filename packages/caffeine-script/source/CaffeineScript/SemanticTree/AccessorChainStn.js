"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let StnRegistry,
    AccessorChainStn,
    mergeInto,
    isArray,
    Error,
    formattedInspect;
  ({ mergeInto, isArray, Error, formattedInspect } = Caf.import(
    ["mergeInto", "isArray", "Error", "formattedInspect"],
    [global, require("../StandardImport")]
  ));
  StnRegistry = require("../StnRegistry");
  return (AccessorChainStn = Caf.defClass(
    class AccessorChainStn extends require("./ValueBaseCaptureStn") {},
    function(AccessorChainStn, classSuper, instanceSuper) {
      this.abstractClass();
      this.prototype.transform = function() {
        return this.transformAccessorChain();
      };
      this.prototype.transformAccessorChain = function() {
        let accessorChain, out;
        accessorChain = this.getLeftAccessorChain();
        out = this._transformAccessorChainR(
          accessorChain[0].value.transform(),
          accessorChain
        );
        mergeInto(out.props, this.props, out.props);
        return out;
      };
      this.prototype.getLeftAccessorChain = function() {
        let current, accessorChain, accessor;
        current = this;
        accessorChain = [];
        while (current && current instanceof AccessorChainStn) {
          accessor = current;
          current = current.value;
          accessorChain.push(accessor);
        }
        return accessorChain.reverse();
      };
      this.prototype._transformAccessorChainR = function(value, accessorChain) {
        let done;
        done = false;
        Caf.each(accessorChain, undefined, (accessor, i, into) => {
          let key, isFunctionInvocation, reset;
          if (!done) {
            ({ key, isFunctionInvocation } = accessor);
            if (isArray(key)) {
              key = Caf.each(key, [], (kk, k, into) => {
                into.push(kk.transform());
              });
            } else {
              key = key.transform();
            }
            if (accessor.existanceTest) {
              reset = accessorChain.slice(i);
              done = true;
              value = this._createExistanceAccessorStn(
                value,
                isFunctionInvocation,
                checkedValueStn => {
                  let access;
                  access = this._createPostTransformedAccessorStn(
                    checkedValueStn,
                    key,
                    accessor
                  );
                  access.props.existanceTest = false;
                  return i < accessorChain.length - 1
                    ? this._transformAccessorChainR(
                        access,
                        accessorChain.slice(i + 1)
                      )
                    : access;
                }
              );
            } else {
              value = this._createPostTransformedAccessorStn(
                value,
                key,
                accessor
              );
            }
          }
        });
        return value;
      };
      this.prototype._createPostTransformedAccessorStn = function(
        value,
        key,
        oldStn
      ) {
        let stnName;
        stnName = oldStn.class.name;
        if (!StnRegistry[stnName]) {
          throw new Error(
            `invalid stnName: ${Caf.toString(formattedInspect(stnName))}`
          );
        }
        return StnRegistry[stnName](oldStn.props, value, key).postTransform();
      };
      this.prototype._createExistanceAccessorStn = function(
        value,
        forFunctionInvocation,
        createRightStn
      ) {
        let res, value1, value2;
        res = forFunctionInvocation
          ? this.getValueWithBaseCapture(value)
          : this.getValueWithCapture(value);
        ({ value1, value2 } = res);
        return StnRegistry.BinaryOperatorStn(
          { operator: "&&" },
          StnRegistry.FunctionInvocationStn(
            StnRegistry.IdentifierStn({
              identifier: forFunctionInvocation ? "Caf.isF" : "Caf.exists"
            }),
            value1
          ),
          createRightStn(value2)
        );
      };
    }
  ));
});
