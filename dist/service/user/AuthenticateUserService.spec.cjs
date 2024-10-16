"use strict";

// src/service/user/AuthenticateUserService.spec.ts
var import_bcrypt2 = require("bcrypt");

// src/repository/user/InMemoryUserRepository.ts
var import_node_crypto = require("crypto");
var InMemoryUserRepository = class {
  users = [];
  async create(user) {
    const createUser = {
      id: (0, import_node_crypto.randomUUID)() ?? user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role ?? "Boss",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null
    };
    this.users.push(createUser);
    return createUser;
  }
  async findByUsername(username) {
    const user = this.users.find((user2) => user2.username === username);
    const userNotFound = !user;
    if (userNotFound) return null;
    return user;
  }
  async findByEmail(email) {
    const user = this.users.find((user2) => user2.email === email);
    const userNotFound = !user;
    if (userNotFound) return null;
    return user;
  }
};

// src/utils/Hash.ts
var import_bcrypt = require("bcrypt");
var Hash = class {
  saltRounds = 8;
  async hashPassword(password) {
    return (0, import_bcrypt.hash)(password, this.saltRounds);
  }
  async comparePassword(password, databasePassword) {
    return (0, import_bcrypt.compare)(password, databasePassword);
  }
};

// src/error/InvalidCredentialsError.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials");
  }
};

// src/service/user/AuthenticateUserService.ts
var AuthenticateUserService = class {
  constructor(userInterface, hash3) {
    this.userInterface = userInterface;
    this.hash = hash3;
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

// src/service/user/AuthenticateUserService.spec.ts
var inMemoryUserRepository;
var hashPassowrd;
var sut;
beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  hashPassowrd = new Hash();
  sut = new AuthenticateUserService(inMemoryUserRepository, hashPassowrd);
});
describe("Create Authenticate Service - test unit", () => {
  it("Should be able to authenticate a user", async () => {
    inMemoryUserRepository.create({
      username: "lucasnather",
      email: "nather@email.com",
      password: await (0, import_bcrypt2.hash)("12345678", 8)
    });
    const { user } = await sut.execute({
      username: "lucasnather",
      email: "nather@email.com",
      password: "12345678"
    });
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
  });
  it("Should not be able to authenticate a user with invalid credendials", async () => {
    inMemoryUserRepository.create({
      username: "lucasnather",
      email: "nather@email.com",
      password: "12345678"
    });
    expect(async () => {
      await sut.execute({
        username: "invalid-username",
        email: "nather@email.com",
        password: "wrong-password"
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
