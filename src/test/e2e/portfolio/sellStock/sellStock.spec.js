import { expect, it, describe } from "vitest";
import { stockMock } from "../../../fixture/stock-fixture";
import { userMock } from "../../../fixture/user-fixture";
import UserService from "../../../../service/user.service";
import { cryptoService } from "../../../../service/provider";
import StockService from "../../../../service/stock.service";
import PortfolioService from "../../../../service/portfolio.service";

const userRepository = {};
const stockRepository = {};

describe("buyStock", () => {
  it("Should sell a stock in portfolio with one left ", async () => {
    userRepository.findById = () => ({
      ...userMock,
      portfolio: [{ ...stockMock, qtd: 1 }],
    });
    userRepository.update = () => ({
      ...userMock,
      portfolio: [],
    });

    stockRepository.findOne = () => ({ ...stockMock });
    stockRepository.update = () => ({ ...stockMock, qtd: 10 });

    const userService = new UserService(cryptoService, userRepository);
    const stockService = new StockService(stockRepository);
    const sut = new PortfolioService(stockService, userService);

    const acquisition = {
      _id: "1",
      qtd: 1,
    };

    const result = await sut.sellStock(acquisition, "1");

    expect(result._id).to.equal("1");
    expect(result.portfolio).to.an("Array");
    expect(result.portfolio.length).to.equal(0);
  });

  it("Should sell a stock in the portfolio that has more than one of the same stock", async () => {
    userRepository.findById = () => ({
      ...userMock,
      portfolio: [{ ...stockMock, qtd: 2 }],
    });

    userRepository.update = () => ({
      ...userMock,
      portfolio: [{ ...stockMock, qtd: 1 }],
    });

    const userService = new UserService(cryptoService, userRepository);
    const stockService = new StockService(stockRepository);
    const sut = new PortfolioService(stockService, userService);

    const acquisition = {
      _id: "1",
      qtd: 1,
    };

    const result = await sut.sellStock(acquisition, "1");

    expect(result._id).to.equal("1");
    expect(result.portfolio).to.an("Array");
    expect(result.portfolio[0].qtd).to.equal(1);
    expect(result.portfolio.length).to.equal(1);
  });

  it("Should sell a stock in the portfolio that has more than one ", async () => {
    userRepository.findById = () => ({
      ...userMock,
      portfolio: [
        { ...stockMock, qtd: 1 },
        { ...stockMock, _id: "2", qtd: 1 },
      ],
    });

    stockRepository.findOne = () => ({ ...stockMock, _id: "2" });
    stockRepository.update = () => ({ ...stockMock, _id: "2", qtd: 9 });

    const userService = new UserService(cryptoService, userRepository);
    const stockService = new StockService(stockRepository);
    const sut = new PortfolioService(stockService, userService);

    const acquisition = {
      _id: "2",
      qtd: 1,
    };

    const result = await sut.sellStock(acquisition, "1");

    expect(result._id).to.equal("1");
    expect(result.portfolio).to.an("Array");
    expect(result.portfolio.length).to.equal(1);
    expect(result.portfolio[0]._id).to.equal("1");
  });
});
