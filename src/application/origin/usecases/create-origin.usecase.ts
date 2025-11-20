import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ORIGIN_REPOSITORY, IOriginRepository } from '../../../core/repositories/origin.repository';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { OriginErrorCodes } from 'src/core/errors/origin-error-codes';

@Injectable()
export class CreateOriginUseCase {
  constructor(@Inject(ORIGIN_REPOSITORY) private repo: IOriginRepository) {}

  async execute(dto: CreateOriginDto) {
    const exists = await this.repo.findByName(dto.name);

    if (exists) {
      throw new BadRequestException({
        errorCode: OriginErrorCodes.ORIGIN_ALREADY_EXISTS,
        message: 'Origin ja existe',
      });
    }
    return this.repo.create(dto);
  }
}
