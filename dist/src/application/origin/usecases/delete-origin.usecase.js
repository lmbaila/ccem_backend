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
exports.DeleteOriginUseCase = void 0;
const common_1 = require("@nestjs/common");
const origin_repository_1 = require("../../../core/repositories/origin.repository");
const origin_error_codes_1 = require("../../../core/errors/origin-error-codes");
let DeleteOriginUseCase = class DeleteOriginUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const origin = await this.repo.findOne(id);
        if (!origin) {
            throw new common_1.BadRequestException({
                errorCode: origin_error_codes_1.OriginErrorCodes.ORIGIN_NOT_FOUND,
                message: 'Origin nao encontrada',
            });
        }
        return this.repo.delete(id);
    }
};
exports.DeleteOriginUseCase = DeleteOriginUseCase;
exports.DeleteOriginUseCase = DeleteOriginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(origin_repository_1.ORIGIN_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteOriginUseCase);
//# sourceMappingURL=delete-origin.usecase.js.map