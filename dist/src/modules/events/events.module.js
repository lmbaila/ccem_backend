"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsHttpModule = void 0;
const common_1 = require("@nestjs/common");
const events_controller_1 = require("./events.controller");
const create_event_usecase_1 = require("../../application/event/usecases/create-event.usecase");
const get_many_events_usecase_1 = require("../../application/event/usecases/get-many-events.usecase");
const get_event_usecase_1 = require("../../application/event/usecases/get-event.usecase");
const update_event_usecase_1 = require("../../application/event/usecases/update-event.usecase");
const delete_event_usecase_1 = require("../../application/event/usecases/delete-event.usecase");
const event_repository_1 = require("../../core/repositories/event.repository");
const prisma_event_repository_1 = require("../../infrastructure/prisma/repositories/prisma-event.repository");
let EventsHttpModule = class EventsHttpModule {
};
exports.EventsHttpModule = EventsHttpModule;
exports.EventsHttpModule = EventsHttpModule = __decorate([
    (0, common_1.Module)({
        controllers: [events_controller_1.EventsController],
        providers: [
            create_event_usecase_1.CreateEventUseCase,
            get_many_events_usecase_1.GetManyEventsUseCase,
            get_event_usecase_1.GetEventUseCase,
            update_event_usecase_1.UpdateEventUseCase,
            delete_event_usecase_1.DeleteEventUseCase,
            { provide: event_repository_1.EVENT_REPOSITORY, useExisting: prisma_event_repository_1.PrismaEventRepository },
        ],
    })
], EventsHttpModule);
//# sourceMappingURL=events.module.js.map