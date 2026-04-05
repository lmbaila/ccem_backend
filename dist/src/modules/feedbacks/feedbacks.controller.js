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
exports.FeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const feedback_repository_1 = require("../../core/repositories/feedback.repository");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
const update_feedback_dto_1 = require("./dto/update-feedback.dto");
const delete_feedback_dto_1 = require("./dto/delete-feedback.dto");
let FeedbacksController = class FeedbacksController {
    constructor(feedbacks) {
        this.feedbacks = feedbacks;
    }
    list() {
        return this.feedbacks.list();
    }
    create(dto, req) {
        return this.feedbacks.create(Object.assign(Object.assign({}, dto), { createdById: req.user.sub }));
    }
    update(id, dto) {
        return this.feedbacks.update(id, dto);
    }
    async remove(dto, req) {
        const userId = req.user.sub;
        const userRole = req.user.role;
        return this.feedbacks.delete({
            eventId: dto.eventId,
            feedbackId: dto.feedbackId,
            userId,
            userRole,
        });
    }
};
exports.FeedbacksController = FeedbacksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista feedbacks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeedbacksController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria feedback' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto, Object]),
    __metadata("design:returntype", void 0)
], FeedbacksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'COMMANDCENTRE'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza feedback' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_feedback_dto_1.UpdateFeedbackDto]),
    __metadata("design:returntype", void 0)
], FeedbacksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove feedback' }),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove um feedback vinculado a um evento (permitido até 1 hora após criação)',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_feedback_dto_1.DeleteFeedbackDto, Object]),
    __metadata("design:returntype", Promise)
], FeedbacksController.prototype, "remove", null);
exports.FeedbacksController = FeedbacksController = __decorate([
    (0, swagger_1.ApiTags)('feedbacks'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('feedbacks'),
    __param(0, (0, common_1.Inject)(feedback_repository_1.FEEDBACK_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], FeedbacksController);
//# sourceMappingURL=feedbacks.controller.js.map