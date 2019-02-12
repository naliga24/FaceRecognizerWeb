throttled-log
=============

Throttled log to STDOUT

If you're writing a lot of data to STDOUT, throttling the output goes a long way to keeping performance up.

Usage
-----

```js
var log = require("throttled-log")();

// This is much faster
for (var i = 1000000 - 1; i >= 0; i--) {
  log("this is a test");
};

// than this
for (var i = 1000000 - 1; i >= 0; i--) {
  console.log("this is a test");
};

// throttled: 268ms vs unthrottled: 6401ms
```
