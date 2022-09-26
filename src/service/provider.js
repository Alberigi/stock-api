const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");

const CryptoService = require("./crypto.service");
const UserService = require("./user.service");
const AuthService = require("./auth.service");
const StockService = require("./stock.service");
const PortfolioService = require("./portfolio.service");

const {
  userRepository,
  stockRepository,
} = require("../infra/repository/provider");

const cryptoService = new CryptoService(bcrypt, jwt);
const userService = new UserService(cryptoService, userRepository);
const stockService = new StockService(stockRepository);
const portfolioService = new PortfolioService(stockService, userService);
const authService = new AuthService(cryptoService, userService);

module.exports = {
  userService,
  stockService,
  cryptoService,
  portfolioService,
  authService,
};
