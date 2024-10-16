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

// src/service/client/CreateClientService.ts
var CreateClientService_exports = {};
__export(CreateClientService_exports, {
  CreateClientService: () => CreateClientService
});
module.exports = __toCommonJS(CreateClientService_exports);
var CreateClientService = class {
  constructor(clientInterface) {
    this.clientInterface = clientInterface;
  }
  async execute({ address, contact, name, lastName, userId }) {
    const client = await this.clientInterface.create({
      address,
      contact,
      lastName,
      name,
      userId
    });
    return {
      client
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateClientService
});
