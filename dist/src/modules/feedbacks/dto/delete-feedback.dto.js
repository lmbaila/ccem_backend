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
exports.DeleteFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeleteFeedbackDto {
}
exports.DeleteFeedbackDto = DeleteFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '82fe1893-44c7-4123-9cbe-128cb0960602',
        description: 'ID do evento ao qual o feedback pertence',
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'eventId deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'eventId é obrigatório.' }),
    __metadata("design:type", String)
], DeleteFeedbackDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: 'ID do feedback que será removido',
    }),
    (0, class_validator_1.IsInt)({ message: 'feedbackId deve ser um número inteiro.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'feedbackId é obrigatório.' }),
    __metadata("design:type", Number)
], DeleteFeedbackDto.prototype, "feedbackId", void 0);
//# sourceMappingURL=delete-feedback.dto.js.map