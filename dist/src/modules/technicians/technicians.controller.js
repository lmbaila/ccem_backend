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
exports.TechniciansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const get_many_technician_usecase_1 = require("../../application/technician/usecases/get-many-technician.usecase");
const create_technician_usecase_1 = require("../../application/technician/usecases/create-technician.usecase");
const update_technician_usecase_1 = require("../../application/technician/usecases/update-technician.usecase");
const get_many_technician_dto_1 = require("./dto/get-many-technician.dto");
const create_technician_dto_1 = require("./dto/create-technician.dto");
const update_technician_dto_1 = require("./dto/update-technician.dto");
const get_technician_by_id_usecase_1 = require("../../application/technician/usecases/get-technician-by-id.usecase");
let TechniciansController = class TechniciansController {
    constructor(getManyTechnician, createTechnician, updateTechnician, getTechnicianById) {
        this.getManyTechnician = getManyTechnician;
        this.createTechnician = createTechnician;
        this.updateTechnician = updateTechnician;
        this.getTechnicianById = getTechnicianById;
    }
    async list(query) {
        return this.getManyTechnician.execute(query);
    }
    create(dto) {
        return this.createTechnician.execute(dto);
    }
    update(id, dto) {
        return this.updateTechnician.execute(id, dto);
    }
    get(id) {
        return this.getTechnicianById.execute(id);
    }
    remove(id) {
    }
};
exports.TechniciansController = TechniciansController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lista tecnicos com paginacao e busca por nome, code ou email',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Filtro de pesquisa (nome, code, email)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Numero da pagina (default: 1)' }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Numero de itens por pagina (default: 10)',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_technician_dto_1.GetManyTechnicianDto]),
    __metadata("design:returntype", Promise)
], TechniciansController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria tecnico (teamId obrigatorio)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_technician_dto_1.CreateTechnicianDto]),
    __metadata("design:returntype", void 0)
], TechniciansController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza tecnico existente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_technician_dto_1.UpdateTechnicianDto]),
    __metadata("design:returntype", void 0)
], TechniciansController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca tecnico por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TechniciansController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove tecnico (so se nao estiver associado a eventos)',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TechniciansController.prototype, "remove", null);
exports.TechniciansController = TechniciansController = __decorate([
    (0, swagger_1.ApiTags)('Technicians'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('technicians'),
    __metadata("design:paramtypes", [get_many_technician_usecase_1.GetManyTechnicianUseCase,
        create_technician_usecase_1.CreateTechnicianUseCase,
        update_technician_usecase_1.UpdateTechnicianUseCase,
        get_technician_by_id_usecase_1.GetTechnicianByIdUseCase])
], TechniciansController);
//# sourceMappingURL=technicians.controller.js.map