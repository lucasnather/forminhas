"use strict";

// src/repository/mold/InMemoryMoldRepository.ts
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

// src/service/molds/CreateMoldsService.ts
var CreateMoldsService = class {
  constructor(moldInterface) {
    this.moldInterface = moldInterface;
  }
  async execute({ amount, model, tonality, price, userId }) {
    const molds = await this.moldInterface.create({
      amount,
      model,
      tonality,
      price,
      userId
    });
    return {
      molds
    };
  }
};

// src/service/molds/CreateMoldsService.spec.ts
var inMemoryMoldRepository;
var sut;
beforeEach(() => {
  inMemoryMoldRepository = new InMemoryMoldRepository();
  sut = new CreateMoldsService(inMemoryMoldRepository);
});
describe("Create Mold Service - test unit", () => {
  it("Should be able to create a new Mold", async () => {
    const { molds } = await sut.execute({
      amount: 200,
      model: "Girassol",
      price: 1e3,
      tonality: "verde"
    });
    expect(molds.id).toBeTruthy();
    expect(molds.createdAt).toBeTruthy();
  });
});
