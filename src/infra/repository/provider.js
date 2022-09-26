const UserModel = require("../models/user.model");
const StockModel = require("../models/stock.model");

const UserRepository = require("./user.repository");
const StockRepository = require("./stock.repository");

const userRepository = new UserRepository(UserModel);
const stockRepository = new StockRepository(StockModel);

module.exports = { userRepository, stockRepository };
