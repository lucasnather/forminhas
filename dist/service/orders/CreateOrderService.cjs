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

// src/service/orders/CreateOrderService.ts
var CreateOrderService_exports = {};
__export(CreateOrderService_exports, {
  CreateOrderService: () => CreateOrderService
});
module.exports = __toCommonJS(CreateOrderService_exports);

// src/error/ResourceNotFoundError.ts
var ResourceNotFoundError = class extends Error {
  constructor(message) {
    super(message || "Resource Not Found");
  }
};

// src/service/orders/CreateOrderService.ts
var CreateOrderService = class {
  constructor(orderInterface, clientInterface) {
    this.orderInterface = orderInterface;
    this.clientInterface = clientInterface;
  }
  async execute({ clientId, moldsId, userId }) {
    const client = await this.clientInterface.findById(clientId);
    if (!client) throw new ResourceNotFoundError("Client Not Found");
    const order = await this.orderInterface.create({
      clientId,
      userId
    }, moldsId);
    return {
      order
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateOrderService
});
