class PortfolioService {
  stockService = {};
  userService = {};

  constructor(stockService, userService) {
    this.userService = userService;
    this.stockService = stockService;
  }

  async buyStock(acquisition, userId) {
    const stockUpdated = await this.stockService.updateQtdStockOnBuy(
      acquisition._id,
      acquisition.qtd
    );
    stockUpdated.qtd = acquisition.qtd;
    return this.userService.handlerUpdateUserPortfolio(
      userId,
      stockUpdated,
      true
    );
  }

  async sellStock(acquisition, userId) {
    const stockUpdated = await this.stockService.updateQtdStockOnSell(
      acquisition._id,
      acquisition.qtd
    );
    stockUpdated.qtd = acquisition.qtd;
    return this.userService.handlerUpdateUserPortfolio(
      userId,
      stockUpdated,
      false
    );
  }
}

module.exports = PortfolioService;
