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
exports.UpdateFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateFeedbackDto {
}
exports.UpdateFeedbackDto = UpdateFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do evento ao qual o feedback pertence',
        example: 'UUID-EVENT',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('4', { message: 'eventId deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'eventId é obrigatório.' }),
    __metadata("design:type", String)
], UpdateFeedbackDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Comentário atualizado do feedback.',
        example: 'Problema parcialmente resolvido, aguardando monitoria final.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'comment deve ser uma string.' }),
    __metadata("design:type", String)
], UpdateFeedbackDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Classificação (1 a 5) atualizada do feedback.',
        example: 4,
        minimum: 1,
        maximum: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'rating deve ser um número inteiro.' }),
    (0, class_validator_1.Min)(1, { message: 'rating mínimo é 1.' }),
    (0, class_validator_1.Max)(5, { message: 'rating máximo é 5.' }),
    __metadata("design:type", Number)
], UpdateFeedbackDto.prototype, "rating", void 0);
//# sourceMappingURL=update-feedback.dto.js.map