"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./infrastructure/prisma/prisma.module");
const auth_module_1 = require("./infrastructure/auth/auth.module");
const events_module_1 = require("./modules/events/events.module");
const users_module_1 = require("./modules/users/users.module");
const services_module_1 = require("./modules/services/services.module");
const technicians_module_1 = require("./modules/technicians/technicians.module");
const feedbacks_module_1 = require("./modules/feedbacks/feedbacks.module");
const dashboards_module_1 = require("./modules/dashboards/dashboards.module");
const team_module_1 = require("./modules/team/team.module");
const metrics_module_1 = require("./modules/metrics/metrics.module");
const orgin_module_1 = require("./modules/origin/orgin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            events_module_1.EventsHttpModule,
            users_module_1.UsersHttpModule,
            services_module_1.ServicesHttpModule,
            technicians_module_1.TechniciansHttpModule,
            feedbacks_module_1.FeedbacksHttpModule,
            dashboards_module_1.DashboardsHttpModule,
            team_module_1.TeamHttpModule,
            metrics_module_1.MetricsModule,
            orgin_module_1.OriginModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map