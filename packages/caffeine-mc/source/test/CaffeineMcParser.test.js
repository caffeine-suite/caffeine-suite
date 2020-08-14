"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "CaffeineMcParser", "assert"],
    [
      global,
      require("art-standard-lib"),
      require("art-testbench"),
      require("../CaffeineMc"),
    ],
    (describe, test, CaffeineMcParser, assert) => {
      return describe({
        noMetaCode: function () {
          test("'hi'", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("hi"));
            assert.eq(!!metaCode, false);
            assert.eq(!!compilerName, false);
            return assert.eq(code, "hi");
          });
          test("multi-line source", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("hi\nthere"));
            assert.eq(!!metaCode, false);
            assert.eq(!!compilerName, false);
            return assert.eq(code, "hi\nthere");
          });
          return test("set compiler-name", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("|FooScript\nhi"));
            assert.eq(!!metaCode, false);
            assert.eq(compilerName, "FooScript");
            return assert.eq(code, "hi");
          });
        },
        illegal: function () {
          return test("|AwesomeScript some meta code on one line without column after compiler-name", () => {
            let parser;
            parser = new CaffeineMcParser();
            return assert.rejects(() =>
              parser.parse(
                "|AwesomeScript some meta code on one line without column after compiler-name"
              )
            );
          });
        },
        degenerate: function () {
          test("|", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("|"));
            assert.eq(!!metaCode, false);
            assert.eq(!!compilerName, false);
            return assert.eq(code, "");
          });
          test("|AwesomeScript", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("|AwesomeScript"));
            assert.eq(!!metaCode, false);
            assert.eq(compilerName, "AwesomeScript");
            return assert.eq(code, "");
          });
          test("|AwesomeScript/SubAwesome", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse(
              "|AwesomeScript/SubAwesome"
            ));
            assert.eq(!!metaCode, false);
            assert.eq(compilerName, "AwesomeScript/SubAwesome");
            return assert.eq(code, "");
          });
          test("| meta code", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse("| meta code"));
            assert.eq(metaCode, "meta code");
            assert.eq(compilerName, undefined);
            return assert.eq(code, "");
          });
          test("|AwesomeScript: meta code", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse(
              "|AwesomeScript: meta code"
            ));
            assert.eq(metaCode, "meta code");
            assert.eq(compilerName, "AwesomeScript");
            return assert.eq(code, "");
          });
          return test("|AwesomeScript:\\n  meta code", () => {
            let parser, metaCode, compilerName, code;
            parser = new CaffeineMcParser();
            ({ metaCode, compilerName, code } = parser.parse(
              "|AwesomeScript\n meta code"
            ));
            assert.eq(metaCode, "meta code");
            assert.eq(compilerName, "AwesomeScript");
            return assert.eq(code, "");
          });
        },
        metaCode: {
          oneLiner: function () {
            test("basic", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "| some meta-code\nhi"
              ));
              assert.eq(metaCode, "some meta-code");
              assert.eq(!!compilerName, false);
              return assert.eq(code, "hi");
            });
            return test("with compilerName", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "|BooScript: some meta-code\nhi"
              ));
              assert.eq(metaCode, "some meta-code");
              assert.eq(compilerName, "BooScript");
              return assert.eq(code, "hi");
            });
          },
          block: function () {
            test("basic", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "|\n  my meta code\nmy normal code"
              ));
              assert.eq(code, "my normal code");
              assert.eq(metaCode, "my meta code");
              return assert.eq(compilerName, undefined);
            });
            test("with compilerName", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "|AwesomeScript\n  my meta code\nmy normal code"
              ));
              assert.eq(code, "my normal code");
              assert.eq(metaCode, "my meta code");
              return assert.eq(compilerName, "AwesomeScript");
            });
            test("with compilerName and optional colon", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "|AwesomeScript:\n  my meta code\nmy normal code"
              ));
              assert.eq(code, "my normal code");
              assert.eq(metaCode, "my meta code");
              return assert.eq(compilerName, "AwesomeScript");
            });
            return test("multi lines", () => {
              let parser, metaCode, compilerName, code;
              parser = new CaffeineMcParser();
              ({ metaCode, compilerName, code } = parser.parse(
                "|AwesomeScript\n  # comment\n\n  # blank line above\n  some code\n    indented\n      and some more"
              ));
              assert.eq(code, "", "code should be empty");
              assert.eq(
                metaCode,
                "# comment\n\n# blank line above\nsome code\n  indented\n    and some more"
              );
              return assert.eq(compilerName, "AwesomeScript");
            });
          },
        },
      });
    }
  );
});