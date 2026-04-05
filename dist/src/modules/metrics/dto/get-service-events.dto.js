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
exports.GetServiceEventsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetServiceEventsDto {
}
exports.GetServiceEventsDto = GetServiceEventsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11/2024',
        description: 'Periodo inicial no formato MM/YYYY',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'startPeriod deve estar no formato MM/YYYY',
    }),
    __metadata("design:type", String)
], GetServiceEventsDto.prototype, "startPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11/2025',
        description: 'Periodo final no formato MM/YYYY',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'endPeriod deve estar no formato MM/YYYY',
    }),
    __metadata("design:type", String)
], GetServiceEventsDto.prototype, "endPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: 'IDs dos serviços a incluir (obrigatório)',
        type: [Number],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => Array.isArray(value) ? value.map(Number) : value.split(',').map(Number)),
    (0, class_validator_1.IsNotEmpty)({ message: 'Deve informar pelo menos um serviceId' }),
    __metadata("design:type", Array)
], GetServiceEventsDto.prototype, "services", void 0);
//# sourceMappingURL=get-service-events.dto.js.map