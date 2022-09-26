
class StockService {
    stockRepository = {};

    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }
    
    async getStocks() {
        return this.stockRepository.findAll();
    }

    async getStock(id) {
        return this.stockRepository.findOne(id);
    }


    async newStock(stock) {
        return this.stockRepository.save(stock);
    }
    
    async updateStock(stock) { 
        return this.stockRepository.update(stock);
    }

    async updateQtdStockOnBuy(id, qtd) {
        const stockData = await this.getStock(id);
        stockData.qtd -= qtd;
        return this.updateStock(stockData);
    }

    async updateQtdStockOnSell(id, qtd) {
        const stockData = await this.getStock(id);
        stockData.qtd += qtd;
        return this.updateStock(stockData);
    }
}

module.exports = StockService;