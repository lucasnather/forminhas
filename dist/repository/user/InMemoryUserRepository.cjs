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

// src/repository/user/InMemoryUserRepository.ts
var InMemoryUserRepository_exports = {};
__export(InMemoryUserRepository_exports, {
  InMemoryUserRepository: () => InMemoryUserRepository
});
module.exports = __toCommonJS(InMemoryUserRepository_exports);
var import_node_crypto = require("crypto");
var InMemoryUserRepository = class {
  users = [];
  async create(user) {
    const createUser = {
      id: (0, import_node_crypto.randomUUID)() ?? user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role ?? "Boss",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null
    };
    this.users.push(createUser);
    return createUser;
  }
  async findByUsername(username) {
    const user = this.users.find((user2) => user2.username === username);
    const userNotFound = !user;
    if (userNotFound) return null;
    return user;
  }
  async findByEmail(email) {
    const user = this.users.find((user2) => user2.email === email);
    const userNotFound = !user;
    if (userNotFound) return null;
    return user;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUserRepository
});
