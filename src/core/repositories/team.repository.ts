export interface GetManyTeamInput {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ITeamRepository {
  list(input: GetManyTeamInput): Promise<any>;
}
