import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ORIGIN_REPOSITORY, IOriginRepository } from '../../../core/repositories/origin.repository';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { OriginErrorCodes } from 'src/core/errors/origin-error-codes';

@Injectable()
export class UpdateOriginUseCase {
  constructor(@Inject(ORIGIN_REPOSITORY) private repo: IOriginRepository) {}

  async execute(id: number, dto: UpdateOriginDto) {
    const origin = await this.repo.findOne(id);

    if (!origin) {
      throw new BadRequestException({
        errorCode: OriginErrorCodes.ORIGIN_NOT_FOUND,
        message: 'Origin nao encontrada',
      });
    }

    if (dto.name) {
      const exists = await this.repo.findByName(dto.name);

      if (exists && exists.id !== id) {
        throw new BadRequestException({
          errorCode: OriginErrorCodes.ORIGIN_ALREADY_EXISTS,
          message: 'Ja existe uma Origin com este nome',
        });
      }
    }
    return this.repo.update(id, dto);
  }
}
