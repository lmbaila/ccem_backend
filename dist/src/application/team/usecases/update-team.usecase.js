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
exports.UpdateTeamUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_repository_1 = require("../../../core/repositories/team.repository");
let UpdateTeamUseCase = class UpdateTeamUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, dto) {
        const team = await this.repo.findById(id);
        if (!team) {
            throw new common_1.NotFoundException('Equipa não encontrada.');
        }
        const existing = await this.repo.findByName(dto.name);
        if (existing && existing.id !== id) {
            throw new common_1.BadRequestException('Já existe uma equipa com esse nome.');
        }
        return this.repo.update(id, dto);
    }
};
exports.UpdateTeamUseCase = UpdateTeamUseCase;
exports.UpdateTeamUseCase = UpdateTeamUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(team_repository_1.TEAM_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateTeamUseCase);
//# sourceMappingURL=update-team.usecase.js.map