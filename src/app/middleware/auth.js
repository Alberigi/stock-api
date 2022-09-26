module.exports = (req, res, next) => {
    if (req.url !== '/signUp' && req.url !== '/signIn') {
        const token = req.headers.authorization;
        if (!token) res.status(401).send({ error: 'Forbidden' });
    }
    next();
};