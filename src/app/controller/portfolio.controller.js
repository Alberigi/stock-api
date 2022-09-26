const express = require('express');
const { portfolioService } = require('../../service/provider');
const { dbConnection } = require('../../infra/config/provider');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/buyStock', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const data = req.body;
        const result = await portfolioService.buyStock(data.acquisition, data.userId);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});

router.post('/sellStock', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const data = req.body;
        const result = await portfolioService.sellStock(data.acquisition, data.userId);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});


module.exports = app => app.use('/', router);