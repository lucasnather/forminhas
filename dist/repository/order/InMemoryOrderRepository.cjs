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

// src/repository/order/InMemoryOrderRepository.ts
var InMemoryOrderRepository_exports = {};
__export(InMemoryOrderRepository_exports, {
  InMemoryOrderRepository: () => InMemoryOrderRepository
});
module.exports = __toCommonJS(InMemoryOrderRepository_exports);
var import_node_crypto = require("crypto");
var InMemoryOrderRepository = class {
  ordersItems = [];
  async create(order, moldsId) {
    const orders = {
      id: order.id ?? (0, import_node_crypto.randomUUID)(),
      clientId: order.clientId,
      userId: order.userId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null,
      wasFinished: false,
      wasPaid: false,
      finishedAt: null
    };
    this.ordersItems.push(orders);
    return orders;
  }
  async findMany() {
    return this.ordersItems;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryOrderRepository
});
