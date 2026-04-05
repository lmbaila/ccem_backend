"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginModule = void 0;
const common_1 = require("@nestjs/common");
const orign_controller_1 = require("./orign.controller");
const origin_repository_1 = require("../../core/repositories/origin.repository");
const prisma_origin_repository_1 = require("../../infrastructure/prisma/repositories/prisma-origin.repository");
const create_origin_usecase_1 = require("../../application/origin/usecases/create-origin.usecase");
const update_origin_usecase_1 = require("../../application/origin/usecases/update-origin.usecase");
const delete_origin_usecase_1 = require("../../application/origin/usecases/delete-origin.usecase");
const find_origin_usecase_1 = require("../../application/origin/usecases/find-origin.usecase");
const list_origin_usecase_1 = require("../../application/origin/usecases/list-origin.usecase");
let OriginModule = class OriginModule {
};
exports.OriginModule = OriginModule;
exports.OriginModule = OriginModule = __decorate([
    (0, common_1.Module)({
        controllers: [orign_controller_1.OriginController],
        providers: [
            { provide: origin_repository_1.ORIGIN_REPOSITORY, useClass: prisma_origin_repository_1.OriginPrismaRepository },
            create_origin_usecase_1.CreateOriginUseCase,
            update_origin_usecase_1.UpdateOriginUseCase,
            delete_origin_usecase_1.DeleteOriginUseCase,
            find_origin_usecase_1.FindOriginUseCase,
            list_origin_usecase_1.ListOriginUseCase,
        ],
        exports: [],
    })
], OriginModule);
//# sourceMappingURL=orgin.module.js.map