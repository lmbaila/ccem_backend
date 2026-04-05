"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const prisma_event_repository_1 = require("./repositories/prisma-event.repository");
const prisma_user_repository_1 = require("./repositories/prisma-user.repository");
const prisma_service_repository_1 = require("./repositories/prisma-service.repository");
const prisma_technician_repository_1 = require("./repositories/prisma-technician.repository");
const prisma_feedback_repository_1 = require("./repositories/prisma-feedback.repository");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            prisma_event_repository_1.PrismaEventRepository,
            prisma_user_repository_1.PrismaUserRepository,
            prisma_service_repository_1.PrismaServiceRepository,
            prisma_technician_repository_1.PrismaTechnicianRepository,
            prisma_feedback_repository_1.PrismaFeedbackRepository,
        ],
        exports: [
            prisma_service_1.PrismaService,
            prisma_event_repository_1.PrismaEventRepository,
            prisma_user_repository_1.PrismaUserRepository,
            prisma_service_repository_1.PrismaServiceRepository,
            prisma_technician_repository_1.PrismaTechnicianRepository,
            prisma_feedback_repository_1.PrismaFeedbackRepository,
        ],
    })
], PrismaModule);
//# sourceMappingURL=prisma.module.js.map