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

// src/repository/client/InMemoryClientRepository.ts
var InMemoryClientRepository_exports = {};
__export(InMemoryClientRepository_exports, {
  InMemoryClientRepository: () => InMemoryClientRepository
});
module.exports = __toCommonJS(InMemoryClientRepository_exports);
var import_node_crypto = require("crypto");
var InMemoryClientRepository = class {
  clientItems = [];
  async create(client) {
    const clients = {
      id: client.id ?? (0, import_node_crypto.randomUUID)(),
      name: client.name,
      contact: client.contact,
      address: client.address,
      lastName: client.lastName,
      userId: client.userId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null
    };
    this.clientItems.push(clients);
    return clients;
  }
  async findById(clientId) {
    const clients = this.clientItems.find((client) => client.id === clientId);
    const clientNotFound = !clients;
    if (clientNotFound) return null;
    return clients;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryClientRepository
});
