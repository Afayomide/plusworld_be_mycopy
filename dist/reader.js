"use strict";
const fs = require("fs");
const content = fs.readFileSync("./index.ts", "utf8");
console.log(content);
