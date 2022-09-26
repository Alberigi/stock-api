const express = require('express');
const { authService } = require('../../service/provider');
const { dbConnection } = require('../../infra/config/provider');

const router = express.Router();

router.post('/signUp', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const result = await authService.signUp(req.body);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});

router.post('/signIn', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const result = await authService.signIn(req.body);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});


module.exports = app => app.use('/', router);