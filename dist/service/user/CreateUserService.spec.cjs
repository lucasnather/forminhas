"use strict";

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

// src/error/UserAlreadyExistsError.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("User Already Exist");
  }
};

// src/service/user/CreateUserService.ts
var CreateUserService = class {
  constructor(userInterface, hash3) {
    this.userInterface = userInterface;
    this.hash = hash3;
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

// src/service/user/CreateUserService.spec.ts
var inMemoryUserRepository;
var hash2;
var sut;
beforeEach(() => {
  inMemoryUserRepository = new InMemoryUserRepository();
  hash2 = new Hash();
  sut = new CreateUserService(inMemoryUserRepository, hash2);
});
describe("Create User Service - test unit", () => {
  it("Should be able to create a new User", async () => {
    const { user } = await sut.execute({
      username: "lucasnather",
      email: "nather@email.com",
      password: "12345678",
      role: "Boss"
    });
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
  });
  it("Should not be able to create a user with duplicate username", async () => {
    await sut.execute({
      username: "lucasnather",
      email: "nather@email.com",
      password: "12345678",
      role: "Boss"
    });
    expect(async () => {
      await sut.execute({
        username: "lucasnather",
        email: "nather@email.com",
        password: "12345678",
        role: "Boss"
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
