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

// src/service/molds/CreateMoldsService.ts
var CreateMoldsService_exports = {};
__export(CreateMoldsService_exports, {
  CreateMoldsService: () => CreateMoldsService
});
module.exports = __toCommonJS(CreateMoldsService_exports);
var CreateMoldsService = class {
  constructor(moldInterface) {
    this.moldInterface = moldInterface;
  }
  async execute({ amount, model, tonality, price, userId }) {
    const molds = await this.moldInterface.create({
      amount,
      model,
      tonality,
      price,
      userId
    });
    return {
      molds
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateMoldsService
});
