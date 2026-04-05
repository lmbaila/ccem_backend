"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamHttpModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const prisma_team_repository_1 = require("../../infrastructure/prisma/repositories/prisma-team.repository");
const team_controller_1 = require("./team.controller");
const get_many_team_usecase_1 = require("../../application/team/usecases/get-many-team.usecase");
const create_team_usecase_1 = require("../../application/team/usecases/create-team.usecase");
const team_repository_1 = require("../../core/repositories/team.repository");
const update_team_usecase_1 = require("../../application/team/usecases/update-team.usecase");
let TeamHttpModule = class TeamHttpModule {
};
exports.TeamHttpModule = TeamHttpModule;
exports.TeamHttpModule = TeamHttpModule = __decorate([
    (0, common_1.Module)({
        controllers: [team_controller_1.TeamController],
        providers: [
            prisma_service_1.PrismaService,
            get_many_team_usecase_1.GetManyTeamUseCase,
            create_team_usecase_1.CreateTeamUseCase,
            update_team_usecase_1.UpdateTeamUseCase,
            {
                provide: team_repository_1.TEAM_REPOSITORY,
                useClass: prisma_team_repository_1.PrismaTeamRepository,
            },
        ],
        exports: [get_many_team_usecase_1.GetManyTeamUseCase, create_team_usecase_1.CreateTeamUseCase, update_team_usecase_1.UpdateTeamUseCase],
    })
], TeamHttpModule);
//# sourceMappingURL=team.module.js.map