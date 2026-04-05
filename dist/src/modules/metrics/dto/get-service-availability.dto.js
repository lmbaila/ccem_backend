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
exports.GetServiceAvailabilityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const date_fns_1 = require("date-fns");
class GetServiceAvailabilityDto {
}
exports.GetServiceAvailabilityDto = GetServiceAvailabilityDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '01/2025',
        description: 'Período inicial no formato MM/YYYY (default: 01/ano corrente)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'startPeriod deve estar no formato MM/YYYY (ex: 01/2025)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value) {
            const now = new Date();
            return `01/${now.getFullYear()}`;
        }
        return value;
    }),
    __metadata("design:type", String)
], GetServiceAvailabilityDto.prototype, "startPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '11/2025',
        description: 'Período final no formato MM/YYYY (default: mês/ano corrente)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'endPeriod deve estar no formato MM/YYYY (ex: 11/2025)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value) {
            const now = new Date();
            return (0, date_fns_1.format)(now, 'MM/yyyy');
        }
        return value;
    }),
    __metadata("design:type", String)
], GetServiceAvailabilityDto.prototype, "endPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Number],
        description: 'Lista de IDs dos serviços (opcional). Pode ser enviado como ?services=1,2,3 ou ?services[]=1&services[]=2',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        if (typeof value === 'string')
            return value.split(',').map(Number);
        if (Array.isArray(value))
            return value.map(Number);
        return [];
    }),
    __metadata("design:type", Array)
], GetServiceAvailabilityDto.prototype, "services", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 99,
        description: 'Meta de disponibilidade em %. Default: 99%',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : 99)),
    __metadata("design:type", Number)
], GetServiceAvailabilityDto.prototype, "target", void 0);
//# sourceMappingURL=get-service-availability.dto.js.map