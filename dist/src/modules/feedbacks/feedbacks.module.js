"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksHttpModule = void 0;
const common_1 = require("@nestjs/common");
const feedbacks_controller_1 = require("./feedbacks.controller");
const feedback_repository_1 = require("../../core/repositories/feedback.repository");
const prisma_feedback_repository_1 = require("../../infrastructure/prisma/repositories/prisma-feedback.repository");
let FeedbacksHttpModule = class FeedbacksHttpModule {
};
exports.FeedbacksHttpModule = FeedbacksHttpModule;
exports.FeedbacksHttpModule = FeedbacksHttpModule = __decorate([
    (0, common_1.Module)({
        controllers: [feedbacks_controller_1.FeedbacksController],
        providers: [{ provide: feedback_repository_1.FEEDBACK_REPOSITORY, useExisting: prisma_feedback_repository_1.PrismaFeedbackRepository }],
    })
], FeedbacksHttpModule);
//# sourceMappingURL=feedbacks.module.js.map