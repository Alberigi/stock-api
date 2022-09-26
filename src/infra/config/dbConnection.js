const mongoose = require('mongoose');

class DbConnection {
    async startConnection() {
        await mongoose.connect(process.env.DATA_BASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Starting connection');
    
        const db = await mongoose.connection;
        await db.on('error', err => console.error(err));
       await db.once('open', () =>   console.log('Connected to database!'))
    }
    
    async endConnection(){
        await mongoose.disconnect()
    }
}

module.exports = DbConnection;
