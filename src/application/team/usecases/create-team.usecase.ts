import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ITeamRepository, TEAM_REPOSITORY } from 'src/core/repositories/team.repository';
import { CreateTeamDto } from 'src/modules/team/dto/create-team.dto';

@Injectable()
export class CreateTeamUseCase {
  constructor(@Inject(TEAM_REPOSITORY) private readonly repo: ITeamRepository) {}

  async execute(dto: CreateTeamDto) {
    const existing = await this.repo.findByName(dto.name);
    if (existing) {
      throw new BadRequestException('Já existe uma equipa com esse nome.');
    }

    return this.repo.create(dto);
  }
}
