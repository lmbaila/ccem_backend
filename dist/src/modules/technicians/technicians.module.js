"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechniciansHttpModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const technician_repository_1 = require("../../core/repositories/technician.repository");
const prisma_technician_repository_1 = require("../../infrastructure/prisma/repositories/prisma-technician.repository");
const technicians_controller_1 = require("./technicians.controller");
const get_many_technician_usecase_1 = require("../../application/technician/usecases/get-many-technician.usecase");
const get_technician_by_id_usecase_1 = require("../../application/technician/usecases/get-technician-by-id.usecase");
const update_technician_usecase_1 = require("../../application/technician/usecases/update-technician.usecase");
const create_technician_usecase_1 = require("../../application/technician/usecases/create-technician.usecase");
const delete_technician_usecase_1 = require("../../application/technician/usecases/delete-technician.usecase");
let TechniciansHttpModule = class TechniciansHttpModule {
};
exports.TechniciansHttpModule = TechniciansHttpModule;
exports.TechniciansHttpModule = TechniciansHttpModule = __decorate([
    (0, common_1.Module)({
        controllers: [technicians_controller_1.TechniciansController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: technician_repository_1.TECHNICIAN_REPOSITORY,
                useClass: prisma_technician_repository_1.PrismaTechnicianRepository,
            },
            get_many_technician_usecase_1.GetManyTechnicianUseCase,
            get_technician_by_id_usecase_1.GetTechnicianByIdUseCase,
            update_technician_usecase_1.UpdateTechnicianUseCase,
            create_technician_usecase_1.CreateTechnicianUseCase,
            delete_technician_usecase_1.DeleteTechnicianUseCase,
        ],
        exports: [
            get_many_technician_usecase_1.GetManyTechnicianUseCase,
            get_technician_by_id_usecase_1.GetTechnicianByIdUseCase,
            update_technician_usecase_1.UpdateTechnicianUseCase,
            create_technician_usecase_1.CreateTechnicianUseCase,
            delete_technician_usecase_1.DeleteTechnicianUseCase,
        ],
    })
], TechniciansHttpModule);
//# sourceMappingURL=technicians.module.js.map