export const TECHNICIAN_REPOSITORY = Symbol('TECHNICIAN_REPOSITORY');

export interface TechnicianQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateTechnicianInput {
  name: string;
  code: string;
  email: string;
  teamId: number; // ✅ agora obrigatorio
}

export interface UpdateTechnicianInput {
  name?: string;
  code?: string;
  email?: string;
  teamId: number; // ✅ obrigatorio tambem
}

export interface ITechnicianRepository {
  list(params: TechnicianQueryParams): Promise<{
    data: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<any>;
  get(id: number): Promise<any>;
}
