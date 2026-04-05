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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUnavailableServicesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetUnavailableServicesDto {
}
exports.GetUnavailableServicesDto = GetUnavailableServicesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        example: 'monthly',
        description: 'Intervalo de tempo (daily, weekly, monthly, yearly)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['daily', 'weekly', 'monthly', 'yearly']),
    __metadata("design:type", String)
], GetUnavailableServicesDto.prototype, "range", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 11,
        minimum: 1,
        maximum: 12,
        description: 'Número do mês (1-12) para filtrar relatórios mensais.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], GetUnavailableServicesDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2025,
        description: 'Ano de referência (ex: 2025)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GetUnavailableServicesDto.prototype, "year", void 0);
//# sourceMappingURL=get-unavailable-services.dto.js.map