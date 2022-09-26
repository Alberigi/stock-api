const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,  
    },
    email: {
        type: String,
        unique: true,
        require: true,  
    },
    password: {
        type: String,
        require: true,  
    },
    cpf: {
        type: String,
        require: true,  
    },
    money: {
        type: Number,
    },
    portfolio: [
        {
            type: Object,
        }
    ]
})

module.exports = mongoose.model('user', UserSchema);
