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

// src/service/orders/MarkOrderAsPaidService.ts
var MarkOrderAsPaidService_exports = {};
__export(MarkOrderAsPaidService_exports, {
  MarkOrderAsPaidService: () => MarkOrderAsPaidService
});
module.exports = __toCommonJS(MarkOrderAsPaidService_exports);

// src/error/ResourceNotFoundError.ts
var ResourceNotFoundError = class extends Error {
  constructor(message) {
    super(message || "Resource Not Found");
  }
};

// src/service/orders/MarkOrderAsPaidService.ts
var MarkOrderAsPaidService = class {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute({ clientName, id, userId }) {
    const order = await this.orderRepository.updateByWasPaid(
      userId,
      id,
      clientName
    );
    if (!order) throw new ResourceNotFoundError("Order Not found");
    return {
      order
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarkOrderAsPaidService
});
