const express = require('express');
const { stockService } = require('../../service/provider');
const { dbConnection } = require('../../infra/config/provider');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/stocks', async (_req, res) => {
    try {
        await dbConnection.startConnection();
        const result = await stockService.getStocks();
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});

router.post('/newStock', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const result = await stockService.newStock(req.body);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});

module.exports = app => app.use('/', router);