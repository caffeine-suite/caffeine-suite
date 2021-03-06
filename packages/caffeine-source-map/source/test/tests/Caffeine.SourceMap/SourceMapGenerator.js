"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "test",
      "SourceMapGenerator",
      "assert",
      "merge",
      "SourceNode",
      "SourceMapConsumer"
    ],
    [global, require("../../StandardImport")],
    (
      test,
      SourceMapGenerator,
      assert,
      merge,
      SourceNode,
      SourceMapConsumer
    ) => {
      let source, generated, sourceFile, generatedFile;
      source = "# a comment line\nlog 10 ** 2";
      generated = "log(Math.pow(10, 2));";
      sourceFile = "test.caf";
      generatedFile = "test.js";
      return (module.exports = {
        suite: {
          basics: function() {
            let standard;
            standard = {
              sourceContent: [source],
              names: [],
              file: "",
              sourceRoot: "",
              mappings: "",
              version: 3,
              sources: ["test.caf"]
            };
            test("new SourceMapGenerator limited", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              return assert.eq(sm.rawSourceMap, standard);
            });
            test("new SourceMapGenerator full", () => {
              let sm;
              sm = new SourceMapGenerator(source, {
                sourceFile,
                generatedFile
              });
              return assert.eq(
                sm.rawSourceMap,
                merge(standard, { file: "test.js" })
              );
            });
            test("addLine", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.addLine();
              return assert.eq(
                sm.rawSourceMap,
                merge(standard, { mappings: ";" })
              );
            });
            return test("addSegment", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.addSegment(1);
              return assert.eq(
                sm.rawSourceMap,
                merge(standard, { mappings: "AAAC" })
              );
            });
          },
          advance: function() {
            test("one char", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 0,
                mappings: ""
              });
              sm.advance("!");
              return assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 1,
                mappings: ""
              });
            });
            test("one new-line", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.advance("\n");
              return assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 0,
                mappings: ";"
              });
            });
            test("code then one new-line", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.advance("blah blah\n");
              return assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 0,
                mappings: ";"
              });
            });
            test("code after one new-line", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.advance("blah blah\nblah");
              return assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 4,
                mappings: ";"
              });
            });
            return test("multiple new-lines followed by code", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.advance("blah\nbl\nah\nblahzoom!");
              return assert.eq(sm.status, {
                lastSourceLine: 0,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 9,
                mappings: ";;;"
              });
            });
          },
          add: function() {
            test("add once", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.add(new SourceNode(17, "log"));
              return assert.eq(sm.status, {
                lastSourceLine: 1,
                lastSourceColumn: 0,
                lastGeneratedColumn: 0,
                nextGeneratedColumn: 3,
                mappings: "AACA"
              });
            });
            test("add twice", () => {
              let sm;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.add(new SourceNode(17, "lo"));
              sm.add(new SourceNode(19, "g"));
              return assert.eq(sm.status, {
                lastSourceLine: 1,
                lastSourceColumn: 2,
                lastGeneratedColumn: 2,
                nextGeneratedColumn: 3,
                mappings: "AACA,EAAE"
              });
            });
            return test("full example", () => {
              let sm, smc;
              sm = new SourceMapGenerator(source, { sourceFile });
              sm.add(new SourceNode(17, "log"));
              sm.add(new SourceNode(null, "("));
              sm.add(new SourceNode(null, "Math.pow("));
              sm.add(new SourceNode(21, "10"));
              sm.add(new SourceNode(null, ", "));
              sm.add(new SourceNode(27, "2"));
              sm.add(new SourceNode(null, "));"));
              smc = new SourceMapConsumer(sm.sourceMap);
              assert.eq(sm.js, "log(Math.pow(10, 2));");
              assert.eq(sm.status, {
                lastSourceLine: 1,
                lastSourceColumn: 10,
                lastGeneratedColumn: 17,
                nextGeneratedColumn: 21,
                mappings: "AACA,aAAI,IAAM"
              });
              return assert.eq(smc.decodedMappings, [
                {
                  generatedLine: 0,
                  generatedColumn: 0,
                  source: 0,
                  sourceLine: 1,
                  sourceColumn: 0
                },
                {
                  generatedLine: 0,
                  generatedColumn: 13,
                  source: 0,
                  sourceLine: 1,
                  sourceColumn: 4
                },
                {
                  generatedLine: 0,
                  generatedColumn: 17,
                  source: 0,
                  sourceLine: 1,
                  sourceColumn: 10
                }
              ]);
            });
          }
        }
      });
    }
  );
});
