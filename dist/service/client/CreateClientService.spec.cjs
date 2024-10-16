"use strict";

// src/repository/client/InMemoryClientRepository.ts
var import_node_crypto = require("crypto");
var InMemoryClientRepository = class {
  clientItems = [];
  async create(client) {
    const clients = {
      id: client.id ?? (0, import_node_crypto.randomUUID)(),
      name: client.name,
      contact: client.contact,
      address: client.address,
      lastName: client.lastName,
      userId: client.userId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: null
    };
    this.clientItems.push(clients);
    return clients;
  }
  async findById(clientId) {
    const clients = this.clientItems.find((client) => client.id === clientId);
    const clientNotFound = !clients;
    if (clientNotFound) return null;
    return clients;
  }
};

// src/service/client/CreateClientService.ts
var CreateClientService = class {
  constructor(clientInterface) {
    this.clientInterface = clientInterface;
  }
  async execute({ address, contact, name, lastName, userId }) {
    const client = await this.clientInterface.create({
      address,
      contact,
      lastName,
      name,
      userId
    });
    return {
      client
    };
  }
};

// src/service/client/CreateClientService.spec.ts
var inMemoryClientRepository;
var sut;
beforeEach(() => {
  inMemoryClientRepository = new InMemoryClientRepository();
  sut = new CreateClientService(inMemoryClientRepository);
});
describe("Create Client Service - test unit", () => {
  it("Should be able to create a new Client", async () => {
    const { client } = await sut.execute({
      name: "Bento",
      lastName: "Pirata",
      address: "Rua 2",
      contact: "(92) 98118-5780"
    });
    expect(client.id).toBeTruthy();
    expect(client.createdAt).toBeTruthy();
  });
});
