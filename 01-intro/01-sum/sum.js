function sum(a, b) {
  if (!Number.isFinite(a)) {
    throw new TypeError(a);
  }
  if (!Number.isFinite(b)) {
    throw new TypeError(b);
  }
  return a+b;
}

module.exports = sum;
