"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../../core/repositories/user.repository");
let AuthService = class AuthService {
    constructor(jwt, users) {
        this.jwt = jwt;
        this.users = users;
    }
    async validateUser(username, pass) {
        const user = await this.users.findByUsername(username);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const match = await bcrypt.compare(pass, user.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return user;
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
            access_token: this.jwt.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        };
    }
    async profile(userId) {
        const user = await this.users.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException();
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(user_repository_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map