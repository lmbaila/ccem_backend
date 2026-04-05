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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const create_event_usecase_1 = require("../../application/event/usecases/create-event.usecase");
const get_many_events_usecase_1 = require("../../application/event/usecases/get-many-events.usecase");
const get_event_usecase_1 = require("../../application/event/usecases/get-event.usecase");
const update_event_usecase_1 = require("../../application/event/usecases/update-event.usecase");
const delete_event_usecase_1 = require("../../application/event/usecases/delete-event.usecase");
const create_event_dto_1 = require("../../application/event/dto/create-event.dto");
const update_event_dto_1 = require("../../application/event/dto/update-event.dto");
const get_events_query_dto_1 = require("../../application/event/dto/get-events-query.dto");
const get_event_by_id_param_dto_1 = require("../../application/event/dto/get-event-by-id-param.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let EventsController = class EventsController {
    constructor(createEvent, listEvents, getEvent, updateEvent, deleteEvent) {
        this.createEvent = createEvent;
        this.listEvents = listEvents;
        this.getEvent = getEvent;
        this.updateEvent = updateEvent;
        this.deleteEvent = deleteEvent;
    }
    list(query) {
        return this.listEvents.execute(query);
    }
    get(query) {
        const { id, code } = query;
        if (!id && !code) {
            throw new common_1.BadRequestException('É necessário informar o ID ou o código do evento.');
        }
        return this.getEvent.execute(query);
    }
    create(dto, req) {
        return this.createEvent.execute(dto, req.user.sub);
    }
    update(id, dto, req) {
        return this.updateEvent.execute(id, dto);
    }
    remove(id) {
        return this.deleteEvent.execute(id);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista eventos com filtros' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_events_query_dto_1.GetEventsQueryDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('find'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca evento por ID ou código (ex: E7F8G9H0)',
        description: 'Endpoint público — não requer autenticação. Permite consultar um evento por ID (UUID) ou código curto (ex: E7F8G9H0).',
    }),
    (0, swagger_1.ApiQuery)({ name: 'id', required: false, description: 'UUID do evento' }),
    (0, swagger_1.ApiQuery)({ name: 'code', required: false, description: 'Código alfanumérico do evento' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_event_by_id_param_dto_1.GetEventByIdOrCodeDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria evento com serviços (startAt/endAt) e técnicos | gera code (8 chars)',
    }),
    (0, swagger_1.ApiBody)({ type: create_event_dto_1.CreateEventDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza estado, prioridade, prazos e associações de um evento existente',
    }),
    (0, swagger_1.ApiBody)({ type: update_event_dto_1.UpdateEventDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove evento' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)('events'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [create_event_usecase_1.CreateEventUseCase,
        get_many_events_usecase_1.GetManyEventsUseCase,
        get_event_usecase_1.GetEventUseCase,
        update_event_usecase_1.UpdateEventUseCase,
        delete_event_usecase_1.DeleteEventUseCase])
], EventsController);
//# sourceMappingURL=events.controller.js.map