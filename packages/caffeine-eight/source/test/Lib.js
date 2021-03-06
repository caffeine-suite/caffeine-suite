// Generated by CoffeeScript 1.12.7
(function() {
  var log, presentSourceLocation;

  log = require('art-standard-lib').log;

  presentSourceLocation = Neptune.Caffeine.Eight.presentSourceLocation;

  module.exports = {
    suite: {
      presentSourceLocation: function() {
        var insertString, source, sourceIndex, testString;
        source = "firstLines = (string, count = 5) ->\n  a = string.split \"\\n\"\n  a.slice 0, count\n  .join \"\\n\"";
        testString = "slice";
        insertString = "<HERE>";
        sourceIndex = source.indexOf(testString);
        test("presentSourceLocation source, sourceIndex", function() {
          var out;
          out = presentSourceLocation(source, sourceIndex);
          assert.eq(sourceIndex, out.indexOf(insertString));
          return assert.eq(sourceIndex + insertString.length, out.indexOf(testString));
        });
        test("presentSourceLocation source, sourceIndex, color: true", function() {
          var out, outIndexOfInsertString;
          out = presentSourceLocation(source, sourceIndex, {
            color: true
          });
          assert.lt(sourceIndex, outIndexOfInsertString = out.indexOf(insertString));
          return assert.lt(outIndexOfInsertString + insertString.length, out.indexOf(testString));
        });
        test("presentSourceLocation source, sourceIndex, maxLines: 1", function() {
          var out;
          out = presentSourceLocation(source, sourceIndex, {
            maxLines: 1
          });
          assert.eq(1, (out.split("\n")).length);
          return assert.match(out, insertString);
        });
        test("presentSourceLocation source, sourceIndex, maxLines: 2", function() {
          var out;
          out = presentSourceLocation(source, sourceIndex, {
            maxLines: 3
          });
          assert.eq(3, (out.split("\n")).length);
          return assert.match(out, insertString);
        });
        return test("presentSourceLocation source, sourceIndex, maxLines: 5", function() {
          var out;
          out = presentSourceLocation(source, sourceIndex, {
            maxLines: 5
          });
          assert.eq(4, (out.split("\n")).length);
          return assert.match(out, insertString);
        });
      }
    }
  };

}).call(this);
