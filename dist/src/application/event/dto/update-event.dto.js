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
exports.UpdateEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ServiceImpactUpdateDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'ID do servico associado.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceImpactUpdateDto.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-01T10:00:00Z',
        description: 'Data/hora de inicio do impacto no servico.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceImpactUpdateDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-11-01T12:00:00Z',
        description: 'Data/hora de fim do impacto no servico (opcional).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], ServiceImpactUpdateDto.prototype, "endAt", void 0);
class FeedbackUpdateDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Atualizacao de status: equipe tecnica ja atuando no problema.',
        description: 'Comentario adicional adicionado durante a atualizacao do evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeedbackUpdateDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 4,
        minimum: 1,
        maximum: 5,
        description: 'Classificacao opcional de 1 a 5.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], FeedbackUpdateDto.prototype, "rating", void 0);
class UpdateEventDto {
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Servico indisponivel parcialmente',
        description: 'Resumo atualizado do evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Apenas alguns canais continuam indisponiveis.',
        description: 'Descricao detalhada da atualizacao.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'INC000011464847',
        description: 'Numero do ticket associado (se houver).',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ticket é obrigatório' }),
    (0, class_validator_1.Matches)(/^INC\d{12}$/, {
        message: 'Formato inválido. Use: INC seguido de 12 dígitos (ex: INC000011464847)',
    }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "ticket", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        example: 'IN_PROGRESS',
        description: 'Novo estado do evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        example: 'MEDIUM',
        description: 'Prioridade atualizada do evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Number],
        example: [1, 3],
        description: 'IDs dos tecnicos associados ao evento.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "technicianIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID da origem do incidente' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "originId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [ServiceImpactUpdateDto],
        description: 'Lista atualizada de servicos impactados.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ServiceImpactUpdateDto),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "services", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [FeedbackUpdateDto],
        description: 'Novos feedbacks adicionados durante a atualizacao do evento (sem apagar os antigos).',
        example: [
            {
                comment: 'Problema parcialmente resolvido.',
                rating: 4,
            },
            {
                comment: 'Monitoria confirma reducao no impacto.',
                rating: 5,
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FeedbackUpdateDto),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "feedbacks", void 0);
//# sourceMappingURL=update-event.dto.js.map