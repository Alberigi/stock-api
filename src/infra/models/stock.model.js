const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true, 
    },
    price: {
        type: Number,
        require: true,   
    },
    qtd: {
        type: Number,
        require: true,   
    }
})

module.exports = mongoose.model('stock', StockSchema);
