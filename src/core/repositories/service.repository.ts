export const SERVICE_REPOSITORY = Symbol('SERVICE_REPOSITORY');
export interface GetManyServiceParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateServiceInput {
  name: string;
  description: string;
}

export interface UpdateServiceInput {
  name?: string;
  description?: string;
}

export interface IServiceRepository {
  list(params: GetManyServiceParams): Promise<{
    data: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  create(data: CreateServiceInput): Promise<any>;
  update(id: number, input: UpdateServiceInput): Promise<any>;
  get(id: number): Promise<any>;
  delete(id: number): Promise<any>;
}
