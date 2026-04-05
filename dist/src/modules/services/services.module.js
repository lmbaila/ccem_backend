"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesHttpModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const service_repository_1 = require("../../core/repositories/service.repository");
const prisma_service_repository_1 = require("../../infrastructure/prisma/repositories/prisma-service.repository");
const get_many_services_usecase_1 = require("../../application/service/usecases/get-many-services.usecase");
const services_controller_1 = require("./services.controller");
const create_service_usecase_1 = require("../../application/service/usecases/create-service.usecase");
const update_service_usecase_1 = require("../../application/service/usecases/update-service.usecase");
let ServicesHttpModule = class ServicesHttpModule {
};
exports.ServicesHttpModule = ServicesHttpModule;
exports.ServicesHttpModule = ServicesHttpModule = __decorate([
    (0, common_1.Module)({
        controllers: [services_controller_1.ServicesController],
        providers: [
            prisma_service_1.PrismaService,
            get_many_services_usecase_1.GetManyServiceUseCase,
            create_service_usecase_1.CreateServiceUseCase,
            update_service_usecase_1.UpdateServiceUseCase,
            {
                provide: service_repository_1.SERVICE_REPOSITORY,
                useClass: prisma_service_repository_1.PrismaServiceRepository,
            },
        ],
        exports: [get_many_services_usecase_1.GetManyServiceUseCase],
    })
], ServicesHttpModule);
//# sourceMappingURL=services.module.js.map