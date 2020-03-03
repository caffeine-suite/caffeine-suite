// standardize across javascript environments:
// global == self == window (if in browser)

const g =
  (typeof window !== "undefined" && window !== null)
  ? window
  : (typeof self !== "undefined" && self !== null)
    ? self
    : global;

g.global = g;
