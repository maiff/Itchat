module.exports = function merge (a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key]
    }
  }
  return a
}
