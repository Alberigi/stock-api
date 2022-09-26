const express = require('express');
const { userService } = require('../../service/provider');
const { dbConnection } = require('../../infra/config/provider');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/user/:id', async (req, res) => {
    try {
        await dbConnection.startConnection();
        const result = await userService.getUserById(req.params.id);
        return res.send(result);
    } catch (erro) {
        console.log(erro);
        return res.send(erro);
    } finally {
        dbConnection.endConnection();
    }
});

module.exports = app => app.use('/', router);