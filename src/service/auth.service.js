class AuthService {
    userService = {};
    cryptoService = {};

    constructor(cryptoService, userService) {
        this.userService = userService;
        this.cryptoService = cryptoService;
    }
    
    async signUp(login) {
        const user = await this.userService.getUserByEmail(login.email);

        if (!user) throw new Error('Email ou senha inválido');
        this.cryptoService.validatePassword(login.password, user.password);
        delete user.password;

        return this.cryptoService.encodeLogin(user);
    }

    async signIn(newUser) {
        return this.userService.newUser(newUser);
    }
}

module.exports = AuthService;