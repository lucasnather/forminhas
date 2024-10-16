"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/jwt-verify.ts
var jwt_verify_exports = {};
__export(jwt_verify_exports, {
  jwtVerify: () => jwtVerify
});
module.exports = __toCommonJS(jwt_verify_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.coerce.number().default(8080),
  JWT_SECRET: import_zod.z.string(),
  COOKIE_SECRET: import_zod.z.string(),
  DATABASE_URL: import_zod.z.string().url()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) throw new Error("Environment variable error");
var env = _env.data;

// src/middleware/jwt-verify.ts
function jwtVerify(req, res, next) {
  const { authorization } = req.headers;
  let token = authorization?.substring(7, authorization.length);
  if (!token) {
    res.status(401).json({
      message: "N\xE3o autorizado"
    });
    return;
  }
  import_jsonwebtoken.default.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "N\xE3o autorizado"
      });
    }
    req.cookies = decoded?.sub;
  });
  next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  jwtVerify
});
