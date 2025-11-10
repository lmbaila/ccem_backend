export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface CreateUserInput {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'COMMANDCENTRE' | 'VIEWER';
}
export interface ListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'ADMIN' | 'COMMANDCENTRE' | 'VIEWER';
}

export interface IUserRepository {
  findByUsername(username: string): Promise<any | null>;
  findById(id: number): Promise<any | null>;
  list(
    params?: ListUsersParams,
  ): Promise<{ data: any[]; total: number; page: number; limit: number }>;
  create(data: CreateUserInput): Promise<any>;
  update(id: number, data: Partial<CreateUserInput>): Promise<any>;
  delete(id: number): Promise<any>;
}
