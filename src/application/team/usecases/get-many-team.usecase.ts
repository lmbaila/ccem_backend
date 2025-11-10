import { Inject, Injectable } from '@nestjs/common';
import { ITeamRepository, GetManyTeamInput } from 'src/core/repositories/team.repository';

export const TEAM_REPOSITORY = Symbol('TEAM_REPOSITORY');

@Injectable()
export class GetManyTeamUseCase {
  constructor(@Inject(TEAM_REPOSITORY) private readonly repo: ITeamRepository) {}

  async execute(params: GetManyTeamInput) {
    return this.repo.list(params);
  }
}
