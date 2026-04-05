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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_overview_usecase_1 = require("../../application/metrics/usecases/get-overview.usecase");
const get_top_services_usecase_1 = require("../../application/metrics/usecases/get-top-services.usecase");
const get_unavailable_services_usecase_1 = require("../../application/metrics/usecases/get-unavailable-services.usecase");
const get_live_feedbacks_usecase_1 = require("../../application/metrics/usecases/get-live-feedbacks.usecase");
const get_dashboard_events_usecase_1 = require("../../application/metrics/usecases/get-dashboard-events.usecase");
const get_timeline_usecase_1 = require("../../application/metrics/usecases/get-timeline.usecase");
const get_metrics_range_dto_1 = require("./dto/get-metrics-range.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const get_unavailable_services_dto_1 = require("./dto/get-unavailable-services.dto");
const get_service_availability_dto_1 = require("./dto/get-service-availability.dto");
const get_service_availability_usecase_1 = require("../../application/metrics/usecases/get-service-availability.usecase");
const get_service_events_dto_1 = require("./dto/get-service-events.dto");
const get_service_events_usecase_1 = require("../../application/metrics/usecases/get-service-events.usecase");
let MetricsController = class MetricsController {
    constructor(overviewUc, topUc, unavailableUc, liveUc, dashboardsUc, timelineUc, serviceAvailability, serviceEventsUc) {
        this.overviewUc = overviewUc;
        this.topUc = topUc;
        this.unavailableUc = unavailableUc;
        this.liveUc = liveUc;
        this.dashboardsUc = dashboardsUc;
        this.timelineUc = timelineUc;
        this.serviceAvailability = serviceAvailability;
        this.serviceEventsUc = serviceEventsUc;
    }
    overview(q) {
        var _a;
        const range = ((_a = q.range) !== null && _a !== void 0 ? _a : 'daily');
        return this.overviewUc.execute(range);
    }
    top(q) {
        var _a;
        const range = ((_a = q.range) !== null && _a !== void 0 ? _a : 'daily');
        return this.topUc.execute(range);
    }
    unavailable(dto) {
        var _a;
        const range = ((_a = dto.range) !== null && _a !== void 0 ? _a : 'daily');
        const filters = {
            month: dto.month,
            year: dto.year,
        };
        return this.unavailableUc.execute(range, filters);
    }
    live(limit) {
        return this.liveUc.execute(limit ? Number(limit) : 20);
    }
    dashboards(q) {
        var _a;
        const range = ((_a = q.range) !== null && _a !== void 0 ? _a : 'daily');
        return this.dashboardsUc.execute(range);
    }
    timeline(q) {
        var _a;
        const range = ((_a = q.range) !== null && _a !== void 0 ? _a : 'daily');
        return this.timelineUc.execute(range);
    }
    async getAvailability(query) {
        return this.serviceAvailability.execute(query);
    }
    async getServiceEvents(query) {
        return this.serviceEventsUc.execute(query);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumo geral (ativos, resolvidos, MTTR, disponibilidade, feedbacks)' }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_metrics_range_dto_1.GetMetricsRangeDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "overview", null);
__decorate([
    (0, common_1.Get)('top-services'),
    (0, swagger_1.ApiOperation)({ summary: 'Top serviços mais impactados (downtime em minutos)' }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_metrics_range_dto_1.GetMetricsRangeDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "top", null);
__decorate([
    (0, common_1.Get)('unavailable-services'),
    (0, swagger_1.ApiOperation)({
        summary: 'Serviços indisponíveis (downtime, uptime e incidentes). Pode filtrar por range, mês e ano.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number, description: 'Número do mês (1-12)' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number, description: 'Ano (ex: 2025)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_unavailable_services_dto_1.GetUnavailableServicesDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "unavailable", null);
__decorate([
    (0, common_1.Get)('live-feedbacks'),
    (0, swagger_1.ApiOperation)({
        summary: 'Feedbacks em tempo real (últimos N feedbacks criados, atualiza de 5 em 5 minutos)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Quantidade de feedbacks a retornar (padrão: 20)',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "live", null);
__decorate([
    (0, common_1.Get)('monitoring-tools'),
    (0, swagger_1.ApiOperation)({ summary: 'Eventos por ferramenta de monitoria (Dashboard)' }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_metrics_range_dto_1.GetMetricsRangeDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "dashboards", null);
__decorate([
    (0, common_1.Get)('timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Evolução temporal: eventos criados x resolvidos' }),
    (0, swagger_1.ApiQuery)({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_metrics_range_dto_1.GetMetricsRangeDto]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "timeline", null);
__decorate([
    (0, common_1.Get)('service-availability'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna uptime, downtime, incidentes e percentagem de disponibilidade por serviço e mês',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_service_availability_dto_1.GetServiceAvailabilityDto]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Get)('service-events'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lista eventos por serviço em um período e calcula disponibilidade/downtime.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_service_events_dto_1.GetServiceEventsDto]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getServiceEvents", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('metrics'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('metrics'),
    __metadata("design:paramtypes", [get_overview_usecase_1.GetOverviewUseCase,
        get_top_services_usecase_1.GetTopServicesUseCase,
        get_unavailable_services_usecase_1.GetUnavailableServicesUseCase,
        get_live_feedbacks_usecase_1.GetLiveFeedbacksUseCase,
        get_dashboard_events_usecase_1.GetDashboardEventsUseCase,
        get_timeline_usecase_1.GetTimelineUseCase,
        get_service_availability_usecase_1.GetServiceAvailabilityUseCase,
        get_service_events_usecase_1.GetServiceEventsUseCase])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map