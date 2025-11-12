import { Injectable, BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { UpdateTeamDto } from 'src/modules/team/dto/update-team.dto';
import { ITeamRepository, TEAM_REPOSITORY } from 'src/core/repositories/team.repository';

@Injectable()
export class UpdateTeamUseCase {
  constructor(@Inject(TEAM_REPOSITORY) private readonly repo: ITeamRepository) {}

  async execute(id: number, dto: UpdateTeamDto) {
    const team = await this.repo.findById(id);
    if (!team) {
      throw new NotFoundException('Equipa não encontrada.');
    }

    const existing = await this.repo.findByName(dto.name);
    if (existing && existing.id !== id) {
      throw new BadRequestException('Já existe uma equipa com esse nome.');
    }

    return this.repo.update(id, dto);
  }
}
