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

// src/service/user/CreateUserService.ts
var CreateUserService_exports = {};
__export(CreateUserService_exports, {
  CreateUserService: () => CreateUserService
});
module.exports = __toCommonJS(CreateUserService_exports);

// src/error/UserAlreadyExistsError.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("User Already Exist");
  }
};

// src/service/user/CreateUserService.ts
var CreateUserService = class {
  constructor(userInterface, hash) {
    this.userInterface = userInterface;
    this.hash = hash;
  }
  async execute({ email, password, role, username }) {
    const isUserExistWithUsername = await this.userInterface.findByUsername(username);
    if (isUserExistWithUsername) throw new UserAlreadyExistsError();
    const isUserExistWithEmail = await this.userInterface.findByEmail(email);
    if (isUserExistWithEmail) throw new UserAlreadyExistsError();
    const hashPassword = await this.hash.hashPassword(password);
    const user = await this.userInterface.create({
      email,
      password: hashPassword,
      username,
      role
    });
    return {
      user
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserService
});
