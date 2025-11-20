import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ORIGIN_REPOSITORY, IOriginRepository } from '../../../core/repositories/origin.repository';
import { OriginErrorCodes } from 'src/core/errors/origin-error-codes';

@Injectable()
export class DeleteOriginUseCase {
  constructor(@Inject(ORIGIN_REPOSITORY) private repo: IOriginRepository) {}

  async execute(id: number) {
    const origin = await this.repo.findOne(id);

    if (!origin) {
      throw new BadRequestException({
        errorCode: OriginErrorCodes.ORIGIN_NOT_FOUND,
        message: 'Origin nao encontrada',
      });
    }
    return this.repo.delete(id);
  }
}
