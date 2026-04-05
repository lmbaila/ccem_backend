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
exports.CreateTechnicianDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTechnicianDto {
}
exports.CreateTechnicianDto = CreateTechnicianDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Carlos Matavele' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTechnicianDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'T001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTechnicianDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'carlos@sb.co.mz' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateTechnicianDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTechnicianDto.prototype, "teamId", void 0);
//# sourceMappingURL=create-technician.dto.js.map