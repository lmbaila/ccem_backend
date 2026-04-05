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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyEventsUseCase = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("../../../core/repositories/event.repository");
let GetManyEventsUseCase = class GetManyEventsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(query) {
        const { page = 1, limit = 10 } = query, filters = __rest(query, ["page", "limit"]);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.repo.list(Object.assign(Object.assign({}, filters), { skip, take: limit })),
            this.repo.count(filters),
        ]);
        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        };
    }
};
exports.GetManyEventsUseCase = GetManyEventsUseCase;
exports.GetManyEventsUseCase = GetManyEventsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_repository_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetManyEventsUseCase);
//# sourceMappingURL=get-many-events.usecase.js.map