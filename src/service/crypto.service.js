class CryptoService {
    bcrypt = {};
    jwt = {};

    constructor(bcrypt, jwt) { 
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    validatePassword(passwordToCheck, password) { 
    const isEqual = this.bcrypt.compareSync(passwordToCheck, password);
        
        if (!isEqual) {
            throw new Error('Email ou senha inválida');
        }
    }

    cryptoPassword(password) { 
        const salt = this.bcrypt.genSaltSync();
        return this.bcrypt.hashSync(password, salt)
    }

    encodeLogin(user) { 
        const authSecret = process.env.APP_AUTH_SECRET
        return {
            ...user,
            token: this.jwt.encode(user,authSecret)
        }
    }

    decode(token) {
      return this.jwt.decode(token, process.env.APP_AUTH_SECRET);  
    }

    validateToken(token) {
        return this.jwt.verify(token,process.env.APP_AUTH_SECRET)
    }
}

module.exports = CryptoService;