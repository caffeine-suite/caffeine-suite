"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "test",
      "assert",
      "fromVlqSigned",
      "toVlqSigned",
      "encodeVlq",
      "intToCharMap",
      "readVlq",
      "readVlqSequence"
    ],
    [global, require("./StandardImport")],
    (
      test,
      assert,
      fromVlqSigned,
      toVlqSigned,
      encodeVlq,
      intToCharMap,
      readVlq,
      readVlqSequence
    ) => {
      return {
        suite: function() {
          let list;
          Caf.each2([-2, -1, 0, 1, 2, 1000], n =>
            test(`fromVlqSigned toVlqSigned ${Caf.toString(n)}`, () =>
              assert.eq(n, fromVlqSigned(toVlqSigned(n))))
          );
          test("toVlqSigned -1", () => assert.eq(3, toVlqSigned(-1)));
          test("toVlqSigned 0", () => assert.eq(0, toVlqSigned(0)));
          test("toVlqSigned 1", () => assert.eq(2, toVlqSigned(1)));
          test("encodeVlq 0", () => assert.eq("A", encodeVlq(0)));
          test("encodeVlq -1", () => assert.eq("D", encodeVlq(-1)));
          test("encodeVlq 16", () => {
            assert.eq(encodeVlq(16), "gB");
            return assert.eq(
              encodeVlq(16),
              intToCharMap[1 << 5] + intToCharMap[1]
            );
          });
          test("readVlq 'gba', index: 0", () => {
            let out;
            return (out = assert.eq(
              { value: 16, index: 2 },
              readVlq("gBa", { index: 0 })
            ));
          });
          Caf.each2((list = [-100, -10, -1, 0, 1, 10, 100, 1000, 10000]), n =>
            test(`readVlq encodeVlq ${Caf.toString(n)}`, () => {
              let encoded, value, index;
              encoded = encodeVlq(n);
              ({ value, index } = readVlq(encoded));
              assert.eq(n, value);
              return assert.eq(index, encoded.length);
            })
          );
          test("readVlqSequence ...", () => {
            let encoded, decoded;
            encoded = Caf.array(list, n => encodeVlq(n)).join("");
            decoded = readVlqSequence(encoded);
            return assert.eq(decoded, list);
          });
          return test('readVlqSequence "AACA"', () =>
            assert.eq(readVlqSequence("AACA"), [0, 0, 1, 0]));
        }
      };
    }
  );
});
