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
exports.DeleteTechnicianUseCase = void 0;
const common_1 = require("@nestjs/common");
const technician_repository_1 = require("../../../core/repositories/technician.repository");
let DeleteTechnicianUseCase = class DeleteTechnicianUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) {
        const technician = await this.repo.get(id);
        if (!technician)
            throw new common_1.NotFoundException('Tecnico nao encontrado.');
        const hasRelations = technician.eventLinks && technician.eventLinks.length > 0;
        if (hasRelations) {
            throw new common_1.BadRequestException('Nao e possivel remover o tecnico, pois esta vinculado a um ou mais eventos.');
        }
        return this.repo.delete(id);
    }
};
exports.DeleteTechnicianUseCase = DeleteTechnicianUseCase;
exports.DeleteTechnicianUseCase = DeleteTechnicianUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(technician_repository_1.TECHNICIAN_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteTechnicianUseCase);
//# sourceMappingURL=delete-technician.usecase.js.map