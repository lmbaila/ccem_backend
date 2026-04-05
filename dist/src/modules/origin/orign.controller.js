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
exports.OriginController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_origin_dto_1 = require("../../application/origin/dto/create-origin.dto");
const list_origin_dto_1 = require("../../application/origin/dto/list-origin.dto");
const update_origin_dto_1 = require("../../application/origin/dto/update-origin.dto");
const create_origin_usecase_1 = require("../../application/origin/usecases/create-origin.usecase");
const delete_origin_usecase_1 = require("../../application/origin/usecases/delete-origin.usecase");
const find_origin_usecase_1 = require("../../application/origin/usecases/find-origin.usecase");
const list_origin_usecase_1 = require("../../application/origin/usecases/list-origin.usecase");
const update_origin_usecase_1 = require("../../application/origin/usecases/update-origin.usecase");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
let OriginController = class OriginController {
    constructor(createUC, updateUC, deleteUC, findUC, listUC) {
        this.createUC = createUC;
        this.updateUC = updateUC;
        this.deleteUC = deleteUC;
        this.findUC = findUC;
        this.listUC = listUC;
    }
    create(dto) {
        return this.createUC.execute(dto);
    }
    list(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search || undefined;
        return this.listUC.execute(search, page, limit);
    }
    findOne(id) {
        return this.findUC.execute(Number(id));
    }
    update(id, dto) {
        return this.updateUC.execute(Number(id), dto);
    }
    delete(id) {
        return this.deleteUC.execute(Number(id));
    }
};
exports.OriginController = OriginController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar uma nova origin',
        description: 'Apenas usuarios ADMIN podem aceder este endpoint. Requer token valido.',
    }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Origin criada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Nao autorizado (token invalido)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado (nao eh admin)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_origin_dto_1.CreateOriginDto]),
    __metadata("design:returntype", void 0)
], OriginController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar origins com filtro e paginacao',
        description: 'Qualquer usuario autenticado pode aceder.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista retornada com sucesso' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_origin_dto_1.ListOriginDto]),
    __metadata("design:returntype", void 0)
], OriginController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar uma origin pelo ID',
        description: 'Qualquer usuario autenticado pode aceder.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Origin encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Origin nao encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OriginController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar origin pelo ID',
        description: 'Apenas usuarios ADMIN podem atualizar. Requer token valido.',
    }),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Origin atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado (nao eh admin)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Origin nao encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_origin_dto_1.UpdateOriginDto]),
    __metadata("design:returntype", void 0)
], OriginController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar origin pelo ID',
        description: 'Apenas usuarios ADMIN podem eliminar. Requer token valido.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Origin eliminada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado (nao eh admin)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Origin nao encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OriginController.prototype, "delete", null);
exports.OriginController = OriginController = __decorate([
    (0, swagger_1.ApiTags)('Origins'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('origins'),
    __metadata("design:paramtypes", [create_origin_usecase_1.CreateOriginUseCase,
        update_origin_usecase_1.UpdateOriginUseCase,
        delete_origin_usecase_1.DeleteOriginUseCase,
        find_origin_usecase_1.FindOriginUseCase,
        list_origin_usecase_1.ListOriginUseCase])
], OriginController);
//# sourceMappingURL=orign.controller.js.map