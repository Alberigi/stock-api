const { cryptoService } = require("../../../service/provider");
const UserService = require("../../../service/user.service");
const StockService = require("../../../service/stock.service");
const PortfolioService = require("../../../service/portfolio.service");

const userRepository = {};
const stockRepository = {};
const userService = new UserService(cryptoService, userRepository);
const stockService = new StockService(stockRepository);
const portfolioService = new PortfolioService(stockService, userService);

module.exports = { portfolioService, userRepository, stockRepository };
