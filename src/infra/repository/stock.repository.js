const { ObjectId } = require('mongoose').Types;

class StockRepository {
    stockModel = {};

    constructor(stockModel) {
        this.stockModel = stockModel;
    }
    
    async findOne(id) {
        return this.stockModel.findById(id);
    }

    async findAll() {
        return this.stockModel.find();
    }

    async save(stock) {
        const result = await this.stockModel.create(stock);
        return result.save();
    }

    async update(stock) {
        return this.stockModel.findByIdAndUpdate({_id: ObjectId(stock._id)}, stock);
    }

    async delete(id) {
        return this.stockModel.deleteOne({_id: ObjectId(id)});
    }
}

module.exports = StockRepository;
