"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/Hash.ts
var Hash_exports = {};
__export(Hash_exports, {
  Hash: () => Hash
});
module.exports = __toCommonJS(Hash_exports);
var import_bcrypt = require("bcrypt");
var Hash = class {
  saltRounds = 8;
  async hashPassword(password) {
    return (0, import_bcrypt.hash)(password, this.saltRounds);
  }
  async comparePassword(password, databasePassword) {
    return (0, import_bcrypt.compare)(password, databasePassword);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Hash
});
