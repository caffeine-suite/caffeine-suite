const isNumber = a => typeof a === "number";

const ops = {
  "-": (a, b) => (isNumber(a) && isNumber(b) ? a - b : undefined),
  "+": (a, b) => (isNumber(a) && isNumber(b) ? a + b : undefined),
  "*": (a, b) => (isNumber(a) && isNumber(b) ? a * b : undefined),
  "/": (a, b) => (isNumber(a) && isNumber(b) ? a / b : undefined),
};

const exampleContext = {
  resolveValue(valueName) {
    if (valueName === "PI") return Math.PI;
    throw new Error(`unknown value name '${valueName}'`);
  },
  resolveFunction(functionName) {
    if (functionName === "sum")
      return (...args) => {
        let sum = 0;
        for (let i = 0; i < args.length; i++) sum += args[i];
        return sum;
      };
  },
};

const resolveInfixBinaryOpsSequence = function (values, operands) {
  let valueStackSize, operandStackSize, to;
  valueStackSize = 1;
  operandStackSize = 0;
  operands.forEach((operand, readIndex) => {
    if (operand === "-" || operand === "+") {
      operands[operandStackSize++] = operands[readIndex];
      values[valueStackSize++] = values[readIndex + 1];
    } else {
      values[valueStackSize - 1] = ops[operands[readIndex]](values[valueStackSize - 1], values[readIndex + 1]);
    }
  });
  let result = values[0];
  for (let i = 0; i < operandStackSize; i++) {
    result = ops[operands[i]](result, values[i + 1]);
  }
  return result;
};

class CalcParser extends require("caffeine-eight").Parser {}

CalcParser.rule({
  root: [
    "expression",
    {
      evaluate(context = exampleContext) {
        return this.expression.evaluate(context);
      },
    },
  ],
  expression: [
    ["binaryOp", "nonBinOpExpr"],
    {
      evaluate(context) {
        return this.matches[0].evaluate(context);
      },
    },
  ],
  binaryOp: [
    "nonBinOpExpr binOpExtension+",
    {
      evaluate(context) {
        return resolveInfixBinaryOpsSequence(
          [this.nonBinOpExpr]
            .concat(this.binOpExtensions.map(({ nonBinOpExpr }) => nonBinOpExpr))
            .map(node => node.evaluate(context)),
          this.binOpExtensions.map(({ op }) => op.text)
        );
      },
    },
  ],
  binOpExtension: "_? op:/[-+*\\/]/ _? nonBinOpExpr",
  nonBinOpExpr: [
    ["parenthetical", "function", "number", "variable"],
    {
      evaluate(context) {
        return this.matches[0].evaluate(context);
      },
    },
  ],
  function: [
    "identifier '(' _? arguments? _? ')'",
    {
      evaluateArguments(context) {
        return this.arguments.getArguments().map(match => match.evaluate(context));
      },
      evaluate(context) {
        const f = context.resolveFunction(this.identifier.text);
        if (!f) throw new Error(`Could not resolve function named: '${this.identifier.text}'`);
        return f(...this.evaluateArguments(context));
      },
    },
  ],
  arguments: [
    "expression argumentExtension*",
    {
      getArguments() {
        return this.matches.filter(match => match.evaluate);
      },
    },
  ],
  argumentExtension: [
    "_? ',' _? expression",
    {
      evaluate(context) {
        return this.expression.evaluate(context);
      },
    },
  ],
  parenthetical: [
    "'(' _? expression _? ')'",
    {
      evaluate(context) {
        return this.expression.evaluate(context);
      },
    },
  ],
  propAccessorExtension: "'.' identifier",
  variable: [
    "identifier propAccessorExtension*",
    {
      evaluate(context) {
        return context.resolveValue(this.text);
      },
    },
  ],
  identifier: /(?!\d)((?!\s)[$\w\u007f-\uffff])+/,
  number: [
    /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/i,
    {
      evaluate(context) {
        return eval(this.text);
      },
    },
  ],
  _: /\s+/,
});

CalcParser.repl({ verbose: true });

module.exports = CalcParser;
