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
exports.CreateEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ServiceImpactDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'serviceId é obrigatório' }),
    __metadata("design:type", Number)
], ServiceImpactDto.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-11-06T06:01:09.753Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ServiceImpactDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-11-06T07:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], ServiceImpactDto.prototype, "endAt", void 0);
class FeedbackCreateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Evento criado via sistema de monitoria.',
        description: 'Comentario sobre o evento no momento da criacao.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FeedbackCreateDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5,
        minimum: 1,
        maximum: 5,
        description: 'Classificacao opcional de 1 a 5.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], FeedbackCreateDto.prototype, "rating", void 0);
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Servico indisponível' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O sistema de pagamentos encontra-se fora do ar.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'INC000011464847' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ticket é obrigatório' }),
    (0, class_validator_1.Matches)(/^INC\d{12}$/, {
        message: 'Formato inválido. Use: INC seguido de 12 dígitos (ex: INC000011464847)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "ticket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do dashboard (ferramenta de monitoria).' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "dashboardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID da origem do incidente' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "originId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        example: 'PENDING',
        description: 'Estado atual do evento.',
    }),
    (0, class_validator_1.IsEnum)(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
    __metadata("design:type", String)
], CreateEventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        example: 'LOW',
        description: 'Nivel de prioridade do evento.',
    }),
    (0, class_validator_1.IsEnum)(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    __metadata("design:type", String)
], CreateEventDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Number],
        example: [1, 2],
        description: 'IDs dos tecnicos associados ao evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "technicianIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ServiceImpactDto],
        description: 'Lista de servicos impactados pelo evento.',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ServiceImpactDto),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "services", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [FeedbackCreateDto],
        description: 'Lista opcional de feedbacks criados junto com o evento.',
        example: [
            {
                comment: 'Evento criado automaticamente via Dynatrace.',
                rating: 4,
            },
            {
                comment: 'Equipa técnica notificada.',
                rating: 5,
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FeedbackCreateDto),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "feedbacks", void 0);
//# sourceMappingURL=create-event.dto.js.map