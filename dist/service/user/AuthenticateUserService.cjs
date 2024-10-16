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

// src/service/user/AuthenticateUserService.ts
var AuthenticateUserService_exports = {};
__export(AuthenticateUserService_exports, {
  AuthenticateUserService: () => AuthenticateUserService
});
module.exports = __toCommonJS(AuthenticateUserService_exports);

// src/error/InvalidCredentialsError.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials");
  }
};

// src/service/user/AuthenticateUserService.ts
var AuthenticateUserService = class {
  constructor(userInterface, hash) {
    this.userInterface = userInterface;
    this.hash = hash;
  }
  async execute({ email, password, username }) {
    const isUserExistWithUsername = await this.userInterface.findByUsername(username);
    if (!isUserExistWithUsername) throw new InvalidCredentialsError();
    const isUserExistWithEmail = await this.userInterface.findByEmail(email);
    if (!isUserExistWithEmail) throw new InvalidCredentialsError();
    const isPasswordValid = await this.hash.comparePassword(password, isUserExistWithEmail.password);
    if (!isPasswordValid) throw new InvalidCredentialsError();
    return {
      user: isUserExistWithUsername
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUserService
});
