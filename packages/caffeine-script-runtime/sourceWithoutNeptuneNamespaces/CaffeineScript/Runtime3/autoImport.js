const throwImportErrors = require('detect-node');

const compactFlatten = require('./compactFlatten');

const throwImportError = (notFound, importNames, libs) => {
  let importFrom = [];
  for (let i = 0, len = libs.length; i < len; i++) {
    const lib = libs[i];
    if (lib === global)
      importFrom.push("global");

    else if (lib != null)
      importFrom.push(
        lib.namespacePath
        || (typeof lib.getName === "function" ? lib.getName() : void 0)
        || Object.keys(lib).join(', ')
      );
    else
      importFrom.push('null');
  }

  importFrom = importFrom.join('\n  ');

  let importFileName = null;
  const {stack} = new Error(), stackArray = stack.split("\n");

  for (let i = 0, len = ref.length; i < len; i++) {
    let ref1, stackLine = stackArray[i];
    if (
      !/caffeine-script-runtime/.test(stackLine) &&
      importFileName != null ? importFileName : importFileName = (ref1 = stackLine.match(/(\/[^\/]+)+\.(caf|js)\b/i)) != null ? ref1[0] : void 0)
        break;
  }

  console.warn(
    "CaffieneScript imports not found:\n" +
    notFound.join('\n  ') +
    "\n\nimporting from:\n  " +
    importFrom +
    "\n\nsource:\n  " +
    (importFileName != null ? importFileName : stack) +
    "\n"
  )
  if (throwImportErrors) {
    throw new Error(`CaffieneScript imports not found: ${notFound.join(', ')}`);
  }
}

/*
IN:
  importNames: array of strings
  libs: array of objects to import from, with arbitrary subarray nesting
  toInvoke: function

EFFECT:
  for each import-name, libs are searched in reverse order for a value with that name.
    if no value is found, an error is down with and information is provided.

  toInvoke is called with each of the values found in order as arugments.
  the value form toInvoke is returned

EXAMPLE:
  importInvoke(["a", "b"], [a:1, b:2], toInvoke)
  EFFECT: return toInvoke 1, 2
*/
module.exports = (importNames, libs, toInvoke) => {
  let notFound = null;
  const importValues = [];
  libs = compactFlatten(libs);

  for (let i = 0, len = importNames.length; i < len; i++) {
    const importName = importNames[i];
    let v, importValue = null;

    for (let j = libs.length - 1; j >= 0; j--) {
      if ((v = libs[j][importName]) != null) {
        importValue = v;
        break;
      }
    }

    if (importValue != null) {
      importValues.push(importValue);

    } else {
      (notFound || (notFound = [])).push(importName);
      importValues.push(new Error(`CaffieneScript import not found: ${importName}`));
    }
  }

  if (notFound != null) {
    throwImportError(notFound, importNames, libs);
  }
  return toInvoke(...importValues);
}