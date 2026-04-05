"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsModule = void 0;
const common_1 = require("@nestjs/common");
const metrics_controller_1 = require("./metrics.controller");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const prisma_metrics_repository_1 = require("../../infrastructure/prisma/repositories/prisma-metrics.repository");
const get_overview_usecase_1 = require("../../application/metrics/usecases/get-overview.usecase");
const get_top_services_usecase_1 = require("../../application/metrics/usecases/get-top-services.usecase");
const get_unavailable_services_usecase_1 = require("../../application/metrics/usecases/get-unavailable-services.usecase");
const get_live_feedbacks_usecase_1 = require("../../application/metrics/usecases/get-live-feedbacks.usecase");
const get_dashboard_events_usecase_1 = require("../../application/metrics/usecases/get-dashboard-events.usecase");
const get_timeline_usecase_1 = require("../../application/metrics/usecases/get-timeline.usecase");
const get_service_availability_usecase_1 = require("../../application/metrics/usecases/get-service-availability.usecase");
const get_service_events_usecase_1 = require("../../application/metrics/usecases/get-service-events.usecase");
let MetricsModule = class MetricsModule {
};
exports.MetricsModule = MetricsModule;
exports.MetricsModule = MetricsModule = __decorate([
    (0, common_1.Module)({
        controllers: [metrics_controller_1.MetricsController],
        providers: [
            prisma_service_1.PrismaService,
            prisma_metrics_repository_1.PrismaMetricsRepository,
            get_overview_usecase_1.GetOverviewUseCase,
            get_top_services_usecase_1.GetTopServicesUseCase,
            get_unavailable_services_usecase_1.GetUnavailableServicesUseCase,
            get_live_feedbacks_usecase_1.GetLiveFeedbacksUseCase,
            get_dashboard_events_usecase_1.GetDashboardEventsUseCase,
            get_timeline_usecase_1.GetTimelineUseCase,
            get_service_availability_usecase_1.GetServiceAvailabilityUseCase,
            get_service_events_usecase_1.GetServiceEventsUseCase,
        ],
        exports: [],
    })
], MetricsModule);
//# sourceMappingURL=metrics.module.js.map