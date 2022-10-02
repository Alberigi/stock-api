import { expect, it, describe } from "vitest";
import { stockMock } from "../../../fixture/stock-fixture";
import StockService from "../../../../service/stock.service";

const stockRepository = {};

describe("getUserById", async () => {
  it("Should get a user by id", async () => {
    stockRepository.save = () => ({ ...stockMock });

    const sut = new StockService(stockRepository);

    const result = await sut.newStock("1");

    expect(result._id).to.equal(stockMock._id);
    expect(result.name).to.equal(stockMock.name);
    expect(result.price).to.equal(stockMock.price);
    expect(result.qtd).to.equal(stockMock.qtd);
  });
});
