export const TEAM_REPOSITORY = Symbol('TEAM_REPOSITORY');

export interface GetManyTeamInput {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ITeamRepository {
  list(input: GetManyTeamInput): Promise<any>;
  create(data: { name: string }): Promise<any>;
  findByName(name: string): Promise<any | null>;
  findById(id: number): Promise<any | null>;
  update(id: number, data: { name: string }): Promise<any>;
}
