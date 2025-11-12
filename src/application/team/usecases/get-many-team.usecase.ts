import { Inject, Injectable } from '@nestjs/common';
import {
  ITeamRepository,
  GetManyTeamInput,
  TEAM_REPOSITORY,
} from 'src/core/repositories/team.repository';

@Injectable()
export class GetManyTeamUseCase {
  constructor(@Inject(TEAM_REPOSITORY) private readonly repo: ITeamRepository) {}

  async execute(params: GetManyTeamInput) {
    return this.repo.list(params);
  }
}
