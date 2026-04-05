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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_many_team_usecase_1 = require("../../application/team/usecases/get-many-team.usecase");
const get_many_team_dto_1 = require("./dto/get-many-team.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const create_team_dto_1 = require("./dto/create-team.dto");
const create_team_usecase_1 = require("../../application/team/usecases/create-team.usecase");
const update_team_dto_1 = require("./dto/update-team.dto");
const update_team_usecase_1 = require("../../application/team/usecases/update-team.usecase");
let TeamController = class TeamController {
    constructor(getManyTeam, createTeam, updateTeam) {
        this.getManyTeam = getManyTeam;
        this.createTeam = createTeam;
        this.updateTeam = updateTeam;
    }
    async list(query) {
        return this.getManyTeam.execute(query);
    }
    async create(dto) {
        return this.createTeam.execute(dto);
    }
    update(id, dto) {
        return this.updateTeam.execute(id, dto);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lista todas as equipas com paginacao, filtro e métricas (total, média e maior equipa)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Pesquisa por nome da equipa' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_team_dto_1.GetManyTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova equipa (nome deve ser único)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza o nome de uma equipa existente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "update", null);
exports.TeamController = TeamController = __decorate([
    (0, swagger_1.ApiTags)('Teams'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [get_many_team_usecase_1.GetManyTeamUseCase,
        create_team_usecase_1.CreateTeamUseCase,
        update_team_usecase_1.UpdateTeamUseCase])
], TeamController);
//# sourceMappingURL=team.controller.js.map