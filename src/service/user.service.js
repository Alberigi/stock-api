class UserService {
    userRepository = {};
    cryptoService = {};

    constructor(cryptoService, userRepository) {
        this.userRepository = userRepository;
        this.cryptoService = cryptoService;
    }
    
    async getUserById(id) {
        return this.userRepository.findById(id);
    }
    
    async getUserByEmail(email) {
        return this.userRepository.findByEmail(email);

    }

    async newUser(newUser) {
        newUser.password = await this.cryptoService.cryptoPassword(newUser.password);
        const user = await this.userRepository.save(newUser);
        delete user.password;

        return this.cryptoService.encodeLogin(user);
    }

    async updateUser(user) {
        return this.userRepository.update(user);
    }

    async handlerUpdateUserPortfolio(id, stock, buy) {
        const user = await this.getUserById(id);
        const stockIndex = user.portfolio.findIndex(e => e._id.toString() === stock._id.toString());

        let userUpdateData = null;

        if (buy) {
            userUpdateData = this.handlerBuyPortfolioStock(stockIndex, user, stock)
        } else {
           userUpdateData =  this.handlerSellPortfolioStock(stockIndex, user, stock);
        }

        return this.updateUser(userUpdateData);
    }

    handlerBuyPortfolioStock(index, user, stock) {
        if (index < 0) {
            user.portfolio.push(stock);
        } else {
            user.portfolio[index].qtd += stock.qtd;
        }
        
        return user;
    }

    handlerSellPortfolioStock(index, user, stock) {
        const sellResult = user.portfolio[index].qtd - stock.qtd;
        if (sellResult === 0) {
            user.portfolio.splice(index, 1);
        } else {
            user.portfolio.splice(index, 1,{ ...stock, qtd: sellResult });
        }

        return user;
    }
}

module.exports = UserService;