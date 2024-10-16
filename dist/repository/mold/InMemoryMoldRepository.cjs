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

// src/repository/mold/InMemoryMoldRepository.ts
var InMemoryMoldRepository_exports = {};
__export(InMemoryMoldRepository_exports, {
  InMemoryMoldRepository: () => InMemoryMoldRepository
});
module.exports = __toCommonJS(InMemoryMoldRepository_exports);
var InMemoryMoldRepository = class {
  moldsItems = [];
  id = 0;
  async create(mold) {
    const molds = {
      id: mold.id ?? this.generateAutoincrementId(),
      amount: mold.amount,
      tonality: mold.tonality,
      model: mold.model,
      price: mold.price,
      userId: mold.userId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null
    };
    this.moldsItems.push(molds);
    return molds;
  }
  async findById(id) {
    const molds = this.moldsItems.find((mold) => mold.id === id);
    const moldNotFound = !molds;
    if (moldNotFound) return null;
    return molds;
  }
  generateAutoincrementId() {
    return ++this.id;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryMoldRepository
});
