// CommonJS export
function print(log) {
  console.log(log);
}

print.err = function (log) {
  console.error("\x1b[31m%s\x1b[0m", log);
};

print.wrn = function (log) {
  console.warn("\x1b[33m%s\x1b[0m", log);
};

print.info = function (log) {
  console.info("\x1b[36m%s\x1b[0m", log);
};

// Export for Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = print;
} else {
  // Export for browser
  window.print = print;
}
